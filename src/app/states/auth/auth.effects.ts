import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { beginLogin, loginSuccess, loginFailure } from './auth.actions';
import { UserService } from '../../service/user.service';
import { fetchmenu } from '../../Store/User/User.action';
import { SessionTimeoutService } from '../../service/session-timeout.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router,
    private sessionTimeout: SessionTimeoutService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(beginLogin),
      switchMap(action =>
        this.service.UserLogin(action.usercred).pipe(
          map(data => {
            if (!data.length) {
              return loginFailure({ error: 'Invalid credentials' });
            }

            const user = data[0];

            if (!user.status) {
              return loginFailure({ error: 'Inactive user' });
            }

            return loginSuccess({ user });
          }),
          catchError(err =>
            of(loginFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(({ user }) => {
        this.service.SetUserToLoaclStorage(user);
        this.sessionTimeout.startSession();
        this.router.navigate(['']);
      }),
      map(({ user }) => fetchmenu({ userrole: user.role }))
    )
  );
}
