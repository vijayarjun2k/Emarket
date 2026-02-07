import { createAction, props } from '@ngrx/store';
import { Userinfo, Usercred } from '../../Store/Model/User.model';

export const BEGIN_LOGIN = '[Auth] Begin Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';

export const beginLogin = createAction(
  BEGIN_LOGIN,
  props<{ usercred: Usercred }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: Userinfo }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(LOGOUT);
