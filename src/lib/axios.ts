import axios from "axios";
import { getSession } from "next-auth/react";

const authedAxios = axios.create({
  baseURL: "https://localhost:7164",
});

authedAxios.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user.AccessToken) {
      config.headers.Authorization = `Bearer ${session.user.AccessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authedAxios;
