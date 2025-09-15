
import api from './api';
import store from './store';
import { refreshAccessToken, logoutUser } from './store/authSlice';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // don’t retry the refresh endpoint itself
    if (originalRequest.url.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResult = await store.dispatch(refreshAccessToken()).unwrap();
        const token = store.getState().auth.accessToken;

        processQueue(null, token);
        isRefreshing = false;

        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (e) {
        processQueue(e, null);
        isRefreshing = false;
        await store.dispatch(logoutUser());
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);



// import api from './api';
// import store from './store';
// import { refreshAccessToken, logoutUser } from './store/authSlice';

// // add access token to outgoing requests
// api.interceptors.request.use((config) => {
//   const token = store.getState().auth.accessToken;
//   if (token) config.headers['Authorization'] = `Bearer ${token}`;
//   return config;
// });

// // handle 401 -> try to refresh once then retry original request
// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshResult = await store.dispatch(refreshAccessToken()).unwrap();
//         const token = store.getState().auth.accessToken;
//         originalRequest.headers['Authorization'] = `Bearer ${token}`;
//         return api(originalRequest);
//       } catch (e) {
//         // refresh failed -> logout
//         await store.dispatch(logoutUser());
//         return Promise.reject(e);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
