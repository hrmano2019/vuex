// types/app.d.ts
export interface User {
  email: string;
  name: string;
}

export interface AppLocals {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: User | null;
}
