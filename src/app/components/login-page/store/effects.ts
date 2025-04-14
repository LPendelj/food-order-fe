import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { loginActions } from './actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// export const loginEffect = createEffect(
//     (
//       actions$ = inject(Actions),
//       authService = inject(AuthService),
//       persistenceService = inject(PersistenceService)
//     ) => {
//       return actions$.pipe(
//         ofType(authActions.login),
//         switchMap(({ request }) => {
//           return authService.login(request).pipe(
//             map((currentUser) => {
//               persistenceService.set('accessToken', currentUser.token);
//               return authActions.loginSuccess({ currentUser });
//             }),
//             catchError((errorResponse: HttpErrorResponse) => {
//               return of(
//                 authActions.loginFailure({
//                   errors: errorResponse.error.errors,
//                 })
//               );
//             })
//           );
//         })
//       );
//     },
//     {
//       functional: true,
//     }
//   );

export const loginEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService), toastrService = inject(ToastrService)) => {
    return actions$.pipe(
      ofType(loginActions.loginUser),
      switchMap(({ request }) => {
        return userService.login(request).pipe(
          map((user) => {
            userService.setUserToLocalStorage(user);
            toastrService.success(`Welcome to Foodmine ${user.name}`, 'Login successful')
            return loginActions.loginUserSuccess({user})
          }),
          catchError((error) =>{
            toastrService.error(error.error, 'Login failed!')
            return of({
              type: loginActions.loginUserFailure.type,
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
        ofType(loginActions.loginUserSuccess),
        tap(() => router.navigateByUrl('/'))
      );
    },
    {
      functional: true,
      dispatch: false,
    }
  );

//       next: (user) => {
//           this.setUserToLocalStorage(user);
//           this.userSubject.next(user);
//           console.log("successful login");
//           this.toastrService.success(`Welcome to Foodmine ${user.name}`, 'Login successful')
//       },
