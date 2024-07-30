import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from '../modal/modal-alert/modal-alert.component';

@Injectable({
  providedIn: 'root'
})
export class ModalControlService {


  constructor(
    public dialog: MatDialog,
  ) { }

  async modalAlert(title: string, description: string) {
    const DIALOGREF = this.dialog.open(ModalAlertComponent, { data: { title, description } });
    // Caso selecionado o confirm
    return DIALOGREF.afterClosed().toPromise().then((result: any) => {
      console.log(`Dialog result: ${result}`);
      return result
    });
  }
}
