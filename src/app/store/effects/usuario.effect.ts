import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuario.actions';

import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
    constructor(private actions$: Actions, private usuariosService: UsuarioService) {

    }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            tap(data => console.log('effect tap ', data)),
            mergeMap(
                (action) => this.usuariosService.getUserById(action.id)
                    .pipe(
                        tap(data => console.log('getUsers effect', data))
                    ) // solo para visualizar
                    .pipe(
                        map(user => usuariosActions.cargarUsuarioSuccess({ usuario: user})),

                        catchError(err => of(usuariosActions.cargarUsuarioError({ payload: err})))
                    ) // importante lanzar la accion de respuesta
            ) // disparar un nuevo observable y que se una
        )
    );
}
