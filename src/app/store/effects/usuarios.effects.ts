import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuarios.actions';

import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions, private usuariosService: UsuarioService) {

    }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            tap(data => console.log('effect tap ', data)),
            mergeMap(
                () => this.usuariosService.getUser()
                    .pipe(
                        tap(data => console.log('getUsers effect', data))
                    ) // solo para visualizar
                    .pipe(
                        map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users})),

                        catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err})))
                    ) // importante lanzar la accion de respuesta
            ) // disparar un nuevo observable y que se una
        )
    );
}
