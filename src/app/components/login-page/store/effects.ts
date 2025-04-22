import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { authActions } from './actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


export const loginEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService), toastrService = inject(ToastrService)) => {
    return actions$.pipe(
      ofType(authActions.loginUser),
      switchMap(({ request }) => {
        return userService.login(request).pipe(
          map((user) => {
            userService.setUserToLocalStorage(user);
            toastrService.success(`Welcome to Foodmine ${user.name}`, 'Login successful')
            return authActions.loginUserSuccess({user})
          }),
          catchError((error) =>{
            toastrService.error(error.error, 'Login failed!')
            return of({
              type: authActions.loginUserFailure.type,
              payload: error,
            })
            }
          )
        );
      })
    );
  },
  {
    functional: true,
  }
);
  export const redirectAfterLoginEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(authActions.loginUserSuccess),
        tap(() => router.navigateByUrl('/'))
      );
    },
    {
      functional: true,
      dispatch: false,
    }
  );


  export const registerEffect = createEffect(
    (actions$ = inject(Actions), userService = inject(UserService), toastrService = inject(ToastrService)) => {
      return actions$.pipe(
        ofType(authActions.registerUser),
        switchMap(({ request }) => {
          return userService.register(request).pipe(
            map((user) => {
              userService.setUserToLocalStorage(user);
              toastrService.success(`Welcome to Foodmine ${user.name}`, 'Registration successful. Please confirm your email')
              return authActions.registerUserSuccess({user})
            }),
            catchError((error) =>{
              toastrService.error(error.error, 'Registration failed!')
              return of({
                type: authActions.registerUserFailure.type,
                payload: error,
              })
              }
            )
          );
        })
      );
    },
    {
      functional: true,
    }
  );

  export const redirectAfterRegisterEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(authActions.registerUserSuccess),
        tap(() => router.navigateByUrl('/'))
      );
    },
    {
      functional: true,
      dispatch: false,
    }
  );