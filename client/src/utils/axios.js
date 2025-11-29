import axios from "axios";
import { BASE_URL, SummaryApi } from "../common/summaryApi";

const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Axios.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          return Axios(originalRequest);
        }

        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(error);
        }
      } catch (refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshToken);
      }
    }
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await Axios({
      ...SummaryApi.user.refreshToken,
      headers: { Authorization: `Bearer ${refreshToken}` },
      withCredentials: true,
    });
    const accessToken = res.data.data.accessToken;
    return accessToken;
  } catch (error) {
    console.log("token refresh failed", error);
    return null;
  }
};

export default Axios;
