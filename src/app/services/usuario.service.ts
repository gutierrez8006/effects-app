import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this.url}/users?per_page=6&delay=4`)
    .pipe(
      map(respuesta => respuesta['data'])
    );
  }

  getUserById(id: string) {
    return this.http.get(`${this.url}/users/${id}`)
    .pipe(
      map(respuesta => respuesta['data'])
    );
  }
}
