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

  setUpdatedTeam: (currentPost) =>
    handleRequest(axiosInstance.get("/penpos/get-list-team", { params: currentPost })),

  startBattle: (data) =>
    handleRequest(axiosInstance.post("/penpos/create-game-session", data)),
};

export const pos = {
  getListPos: () =>
    handleRequest(axiosInstance.get("/user/get-list-pos")),
};

export const rally = {
  checkAcc: () =>
    handleRequest(axiosInstance.get("/user/check-acc")),

  getUpdatedCurrentPost: (data) =>
    handleRequest(axiosInstance.put("/user/update-user-pos", data)),

  getWaitingList: (currentPost) =>
    handleRequest(axiosInstance.get("/penpos/get-list-team", { params: currentPost })),

  quitGame: () =>
    handleRequest(axiosInstance.get("/user/exit-waiting-room")),
}

export const battleAbn = {
  getCard: (data) =>
    handleRequest(axiosInstance.post("/user/abn/get-card", data)),
};
