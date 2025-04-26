import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FoodService } from "src/app/services/food/food.service";
import { homeActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { inject } from "@angular/core";


export const getFoodDataEffect = createEffect((
    actions$ = inject(Actions),
    foodService = inject(FoodService),
) =>
  actions$.pipe(
    ofType(homeActions.getFoodData),
    switchMap(() =>
      foodService.getAll().pipe(
        map((response) => homeActions.getFoodDataSuccess({ response })),
        catchError((error) => of(homeActions.getFoodDataFailure({ error })))
      )
    ) 
  ),
  {
    functional: true,
  }
);

export const getFoodDataBySearchTermEffect = createEffect((
    actions$ = inject(Actions),
    foodService = inject(FoodService),
) =>
  actions$.pipe(
    ofType(homeActions.getFoodDataBySearchTerm),
    switchMap(({searchTerm}) =>
      foodService.getFoodBySearchTerm(searchTerm).pipe(
        map((response) => homeActions.getFoodDataBySearchTermSuccess({ response })),
        catchError((error) => of(homeActions.getFoodDataBySearchTermFailure({ error })))
      )
    )
  ),
  {
    functional: true,
  }
);

export const getFoodDataByTagEffect = createEffect((
    actions$ = inject(Actions),
    foodService = inject(FoodService),
) =>
  actions$.pipe(
    ofType(homeActions.getFoodDataByTag),
    switchMap(({tag}) =>
      foodService.getFoodByTag(tag).pipe(
        map((response) => homeActions.getFoodDataByTagSuccess({ response })),
        catchError((error) => of(homeActions.getFoodDataByTagFailure({ error })))
      )
    )
  ),
  {
    functional: true,
  }
);