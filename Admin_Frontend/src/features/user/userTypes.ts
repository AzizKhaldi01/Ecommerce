// src/features/user/userTypes.ts

export type Role =
  | "admin"
  | "productManager"
  | "orderManager"
  | "teamManager"
  | "statisticManager"
  | "user";

export interface UserState {
  name: string;
  image: string;
  email: string;
  roles: Role[];
}

export type UserAction =
  | { type: "user/setUser"; payload: UserState }
  | { type: "user/clearUser" };
