import { createAxiosInstance } from "./axiosInstances";
import { createHandleRequest } from "./interceptors";

// Membuat Axios instance dengan konfigurasi global
const handleRequest = createHandleRequest();
const axiosInstance = createAxiosInstance();

export const auth = {
  login: (data) =>
    handleRequest(axiosInstance.post("/auth/login", data)),
};

export const penpos = {
  getPos: () =>
    handleRequest(axiosInstance.get("/penpos/get-pos")),

  setUpdatedTeam: (data) =>
    handleRequest(axiosInstance.post("/penpos/get-list-team", data)),
}
