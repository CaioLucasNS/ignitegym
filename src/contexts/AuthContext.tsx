import { createContext } from "react";

import { UserDTO } from "@dtos/UsersDTO";

export type AuthContextDataProps = {
  user: UserDTO;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);
