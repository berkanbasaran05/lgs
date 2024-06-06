import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_APP_API_URL}/api`
});

const refresh = async () => {
  try {
    const res = await axios.post(`/api/auth/refresh`);
    if (res.data) {
      return res.data.accessToken;
    }
  } catch (error) {
    await axios.post(`/api/auth/clear`);
    localStorage.clear();
    window.location.reload();
  }
};

axiosInstance.interceptors.request.use(
  async (req) => {
    const accessToken = await cookies.get(`accessToken`);

    if (accessToken && req.headers) {
      req.headers.Authorization = 'Bearer ' + accessToken;
    }
    return req;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const newAccessToken = await refresh();
        axiosInstance.defaults.headers.common['Authorization'] =
          'Bearer ' + newAccessToken;
        return axiosInstance(error.config);
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const newAccessToken = await refresh();
        axiosInstance.defaults.headers.common['Authorization'] =
          'Bearer ' + newAccessToken;
        return axiosInstance(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
