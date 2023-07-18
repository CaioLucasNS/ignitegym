import axios, { AxiosError, AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://127.0.0.1:3333", // localhost
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing: boolean = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      // 401 = requisição não autorizada = token
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            // se não existir
            signOut(); // desloga o user
            return Promise.reject(requestError); // retorna um reject
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            // verificando se ta acontecendo a solicitação de um novo token
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };

                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token,
              }); // endpoint do backend de refresh token

              await storageAuthTokenSave({
                token: data.token,
                refresh_token: data.refresh_token,
              });
              console.log("TOKEN ATUALIZADO => ", data);
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
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
