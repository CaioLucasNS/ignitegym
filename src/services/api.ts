import axios, { AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://127.0.0.1:3333", // localhost
}) as APIInstanceProps;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      // 401 = requisição não autorizada = token
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
        }

        signOut();
      }

      // só chega nessa verificação caso não seja um erro relacionado ao token
      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message)); // erro vindo do back-end
      } else {
        return Promise.reject(requestError); // erro genérico
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
