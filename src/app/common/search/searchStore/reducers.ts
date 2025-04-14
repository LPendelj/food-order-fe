import { createFeature, createReducer, on } from "@ngrx/store";
import { searchActions } from "./actions";
import { SearchStateInterface } from "../types/searchState.interface";


export const initialState: SearchStateInterface = {
  isLoading: false,
  searchTerm: '',
  items: []
}

const searchFeature = createFeature({
    name: 'search',
    reducer: createReducer(
        initialState,
        on(searchActions.searchFood, (state, action) => ({...state, isLoading: true, searchTerm: action.searchTerm })),
        on(searchActions.searchFoodSuccess, (state, action) => ({...state, isLoading: false, items: action.items})),
        on(searchActions.searchFoodFailure, (state, action) => ({...state, isLoading: false})),
    )
  })

  export const {
    name: searchFeatureKey,
    reducer: searchReducer,
    selectIsLoading,
    selectSearchTerm,
    selectItems
  } = searchFeature;