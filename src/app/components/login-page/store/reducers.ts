import { createFeature, createReducer, on } from '@ngrx/store';
import { loginActions } from '../store/actions';
import { User } from 'src/app/shared/models/User';

export interface LoginState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: LoginState = {
  isLoading: false,
  error: null,
  user: null
};

const loginFeature = createFeature({
  name: 'login',
  reducer: createReducer(
    initialState,
    on(loginActions.loginUser, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(loginActions.loginUserSuccess, (state, action) => ({
      ...state,
      user: action.user,
      isLoading: false,
      error: null,
    })),
    on(loginActions.loginUserFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }))
  ),
});

export const {
  name: loginFeatureKey,
  reducer: loginReducer,
  selectIsLoading,
  selectError,
  selectUser
} = loginFeature;
