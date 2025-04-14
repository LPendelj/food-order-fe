import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { searchActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { FoodService } from "src/app/services/food/food.service";


export const searchFoodEffect = createEffect(
    (
      actions$ = inject(Actions),
      foodService = inject(FoodService),
    ) => {
      return actions$.pipe(
        ofType(searchActions.searchFood),
        switchMap(({searchTerm}) => {
           return foodService.getAllFoodsBySearchTerm(searchTerm).pipe(
            map((items) => {
              return searchActions.searchFoodSuccess({items})
            }),
            catchError(()=>{
                return of(searchActions.searchFoodFailure())
            })
          )
        })
    )
    },
    {
      functional: true
    }
  );

  export const redirectAfterSearchFoodEffect = createEffect(
    (
      actions$ = inject(Actions),
      router = inject(Router),
    ) => {
      return actions$.pipe(
        ofType(searchActions.searchFood),
        tap(({searchTerm}) => {
          
           return router.navigateByUrl(`/search/${searchTerm}`)
        })
    )
    },
    {
      functional: true
    }
  );