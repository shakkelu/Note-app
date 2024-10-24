// axiosInstance.js
import axios from "axios";
import { setToken, logout } from "../store/authSlice"; // Import actions to set and clear token
import storage from "./../store/store";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Base URL for all API calls
  withCredentials: true, // Allow sending cookies like refreshToken
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Inside the interceptor!");
    const state = storage.getState();
    const token = state.auth.userToken; // Access token from Redux store
    console.log(token);

    if (token) {
      config.headers.authorization = `Bearer ${token}`; // Attach token to headers
      console.log("Token mounted in header by the interceptor!");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the response is 401 (Unauthorized) and it's not already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        const refreshResponse = await axiosInstance.get(
          "api/users/refresh-token"
        );

        // Get new access token from refresh response
        const newAccessToken = refreshResponse.data.accessToken;

        // Update the access token in Redux store
        storage.dispatch(setToken(newAccessToken));

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // Retry the failed request
      } catch (refreshError) {
        // If refresh token fails, log out the user
        storage.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
