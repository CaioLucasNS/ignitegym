import { createContext, ReactNode, useState } from "react";

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
  const [user, setUser] = useState<UserDTO>({
    id: "1",
    name: "Caio Lucas",
    email: "caio@email.com",
    avatar: "caio.png",
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
