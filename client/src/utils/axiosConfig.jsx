import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:4000",
});

// Function to configure axios interceptors
export const configureAxiosInterceptors = (token, dispatch, setToken) => {
  // Request Interceptor to include access token
  api.interceptors.request.use(
    async (config) => {
      if (!token) {
        try {
          // If no access token, attempt to refresh it
          const { data } = await axios.post(
            "http://localhost:4000/api/refresh-token",
            {},
            { withCredentials: true }
          );
          dispatch(setToken(data.accessToken)); // Update token in the store

          // Add the new access token to the request header
          config.headers.Authorization = `Bearer ${data.accessToken}`;
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        // If access token exists, add it to the request header
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor to handle token expiration and retry request
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Refresh the access token
          const { data } = await axios.post(
            "http://localhost:4000/api/refresh-token",
            {},
            { withCredentials: true }
          );

          dispatch(setToken(data.accessToken));

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
};

export default api;
