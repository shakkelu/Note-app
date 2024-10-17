import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh the access token
        const { data } = await axios.post(
          "http://localhost:5000/api/refresh-token",
          {},
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", data.accessToken);

        // Retry the original request with the new token
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
