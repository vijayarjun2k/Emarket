import { Userinfo } from "../../Store/Model/User.model";

export interface AuthState {
  user: Userinfo | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};
