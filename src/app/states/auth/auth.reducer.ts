import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { beginLogin, loginSuccess, loginFailure, logout } from './auth.actions';

const _authReducer = createReducer(
  initialAuthState,

  on(beginLogin, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    isAuthenticated: false
  })),

  on(logout, () => initialAuthState)
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
