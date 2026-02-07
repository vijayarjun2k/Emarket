import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

export const isAuthenticated = createSelector(
  selectAuthState,
  state => state.isAuthenticated
);

export const loggedInUser = createSelector(
  selectAuthState,
  state => state.user
);

export const authError = createSelector(
  selectAuthState,
  state => state.error
);

export const authLoading = createSelector(
  selectAuthState,
  state => state.loading
);
