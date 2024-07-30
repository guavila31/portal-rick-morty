import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly URL = 'https://rickandmortyapi.com/api/character'
  constructor(private http: HttpClient) { }

  buscar(value: string): Observable<any> | any {
    try {
      const params = new HttpParams().append('name', value)
      return this.http.get<any>(this.URL, { params })
    } catch (error) {
      console.log(error);
    }
  }

  buscarPaginacao(url: string): Observable<any> | any {
    try {
      return this.http.get<any>(url)
    } catch (error) {
      console.log(error);
    }
  }
}
