import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

/**
config - acesso a todas as informações da requisição / request
error - ação caso algo der errado
api.interceptors.request.use(
  (config) => {
    console.log("DADOS ENVIADOS => ", config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 */

api.interceptors.response.use(
  (response) => {
    console.log("INTERCEPTOR RESPONSE => ", response);
    return response;
  },
  (error) => {
    console.log("INTERCEPTOR RESPONSE ERROR => ", error);
    return Promise.reject(error);
  }
);

export { api };
