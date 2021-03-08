import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit, OnDestroy {
  subscribe$: Subscription;
  usuario: Usuario;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.subscribe$.unsubscribe();
  }

  ngOnInit(): void {
    this.store.select('usuario').subscribe(({user, loading, error}) => {
      this.usuario = user;
    });

    this.subscribe$ = this.router.params.subscribe(({ id }) => {
      console.log(id);
      this.store.dispatch(cargarUsuario({id}));
    });
  }


}
