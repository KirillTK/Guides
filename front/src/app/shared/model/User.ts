export interface User {
  _id?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isActivate?: boolean;
}
