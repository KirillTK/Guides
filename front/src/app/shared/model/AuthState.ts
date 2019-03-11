import {User} from './User';

export interface AuthState {
  isAuth: boolean;
  user?: User;
}
