import { createFeature, createReducer, on } from "@ngrx/store"
import { homeActions } from "./actions"
import { FoodInitialState } from "../models/foodInitialState"


const initialState: FoodInitialState = {
  isLoading: false,
  error: null,
  foodData: null,
  searchTerm: null,
  tag: null,
}

const foodFeature = createFeature({
  name: "food",
  reducer: createReducer(
    initialState,
    on(homeActions.getFoodData, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(homeActions.getFoodDataSuccess, (state, { response }) => ({
        ...state,
        foodData: response,
        isLoading: false,
    })),
    on(homeActions.getFoodDataFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false,
    })),
    on(homeActions.getFoodDataBySearchTerm, (state, { searchTerm }) => ({
        ...state,
        isLoading: true,
        searchTerm,
    })),
    on(homeActions.getFoodDataBySearchTermSuccess, (state, { response }) => ({
        ...state,
        foodData: response,
        isLoading: false,
    })),
    on(homeActions.getFoodDataBySearchTermFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false,
    })),
    on(homeActions.getFoodDataByTag, (state, { tag }) => ({
        ...state,
        isLoading: true,
        tag
    })),
    on(homeActions.getFoodDataByTagSuccess, (state, { response }) => ({
        ...state,
        foodData: response,
        isLoading: false,
    })),
    on(homeActions.getFoodDataByTagFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false,
    })),
)})

export const {
    name: foodFeatureKey,
    reducer: foodReducer,
    selectIsLoading: selectFoodIsLoading,
    selectError: selectFoodError,
    selectFoodData: selectFoodData,
} = foodFeature