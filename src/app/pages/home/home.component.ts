import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, debounceTime, filter, map, Observable, retry, switchMap, tap, throwError } from 'rxjs';
import { CharacterInterface, CharacterResultInterface } from 'src/app/shared/interfaces/character';
import { ModalAlertComponent } from 'src/app/shared/modal/modal-alert/modal-alert.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { ModalControlService } from 'src/app/shared/services/modal-control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  bFavorite: boolean = false
  bLoading: boolean = false

  arrCharacter: CharacterResultInterface[] = []
  arrCharacterFavorite: CharacterResultInterface[] = []

  sSearch = new FormControl();
  sErrorMessage: string = ''
  nextUrl: string = ''

  nStop = 700

  data: string = '';

  counter$ = this.favoriteService.favorite$;
  tab$ = this.favoriteService.tab$;

  arrCharacterFound$: Observable<CharacterInterface>
  matDialogRef: MatDialogRef<ModalAlertComponent> | any

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private favoriteService: FavoriteService,
    private modalService: ModalControlService,
    public dialog: MatDialog
  ) {
    // favoriteService.tab$.subscribe(tab => {

    // })

    this.arrCharacterFound$ = new Observable()
    this.searchData()
  }
  async abrirModal() {
    await this.modalService.modalAlert('Não encontrado', 'Não foi encontrado nenhum personagem nessa busca').then(res => {
      console.log('Entrou aqui');
      this.searchData()
    })
  }

  searchData() {
    this.arrCharacterFound$ = this.sSearch.valueChanges
      .pipe(
        debounceTime(this.nStop),
        filter((valorDigitado: string) => valorDigitado.length >= 3 || valorDigitado.length == 0),
        switchMap((valorDigitado: string) => this.api.buscar(valorDigitado)),
        tap((retornoAPI: any) => {
          this.nextUrl = retornoAPI.info ? retornoAPI.info.next : '';
          this.arrCharacter = this.mergeArrays(retornoAPI.results, this.arrCharacterFavorite)
        }),
        catchError((erro) => {
          console.error('Error: ', erro)
          this.abrirModal()
          return throwError(() => new Error(this.sErrorMessage = 'Ops, ocorreu um erro. Recarregue a aplicação!'))
        })
      )
  }

  addDataFavorite(data: CharacterResultInterface) {
    this.arrCharacterFavorite.push({ ...data, favorite: true })
    this.snackBar.open('Adicionado aos favoritos', 'Ok', { duration: 1500, horizontalPosition: 'center', verticalPosition: 'top' });
    this.favoriteService.updateCounter({ counter: (this.arrCharacterFavorite.length) });
  }

  removeDataFavorite(data: CharacterResultInterface) {
    this.arrCharacterFavorite = this.arrCharacterFavorite.filter(item => item.id !== data.id)
    this.snackBar.open('Removido dos favoritos', 'Ok', { duration: 1500, horizontalPosition: 'center', verticalPosition: 'top' });
    this.favoriteService.updateCounter({ counter: (this.arrCharacterFavorite.length) });
  }

  mergeArrays(arrCharacter_1: CharacterResultInterface[], arrCharacter_2: CharacterResultInterface[]) {
    const result = [...arrCharacter_1];

    if (arrCharacter_1.some((obj: any) => obj.hasOwnProperty("id"))) {
      result.forEach(obj => {
        if (arrCharacter_2.some(item => item.id === obj.id)) obj.favorite = true;
        else obj.favorite = false;
      });
    }
    return result;
  }

  loadMoreCharacters() {
    this.bLoading = true
    if (this.nextUrl) {
      this.api.buscarPaginacao(this.nextUrl).pipe(
        tap((retornoAPI: CharacterInterface) => {
          this.nextUrl = retornoAPI.info ? retornoAPI.info.next : '';
        }),
        map((resultado: CharacterInterface) => this.mergeArrays(resultado.results, this.arrCharacterFavorite)),
        tap((retornoAPI: CharacterInterface) => {
          this.bLoading = false
          console.log('retornoAPI: ', retornoAPI)
        }),
        retry(1),
        catchError(erro => {
          this.bLoading = false
          console.error('Error: ', erro);
          return throwError(() => new Error(this.sErrorMessage));
        })
      ).subscribe((newCharacters: CharacterResultInterface[]) => {
        this.arrCharacter = [...this.arrCharacter, ...newCharacters];
      });
    }
  }

}
