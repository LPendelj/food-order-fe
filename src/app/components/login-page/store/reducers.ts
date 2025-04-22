import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from '../store/actions';
import { AuthState } from '../authState';


const initialState: AuthState = {
  isLoading: false,
  error: null,
  user: null
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.loginUser, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(authActions.loginUserSuccess, (state, action) => ({
      ...state,
      user: action.user,
      isLoading: false,
      error: null,
    })),
    on(authActions.loginUserFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(authActions.registerUser, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(authActions.registerUserSuccess, (state, action) => ({
      ...state,
      user: action.user,
      isLoading: false,
      error: null,
    })),
    on(authActions.registerUserFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error: error,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsLoading,
  selectError,
  selectUser
} = authFeature;
