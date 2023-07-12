import { createContext, ReactNode } from "react";

import { UserDTO } from "@dtos/UsersDTO";

export type AuthContextDataProps = {
  user: UserDTO;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "1",
          name: "Caio Lucas",
          email: "caio@email.com",
          avatar: "caio.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
