import axios from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message)); // erro vindo do back-end
    } else {
      return Promise.reject(error); // erro genérico
    }
  }
);

export { api };
