import axios from 'axios';

const apiURL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: `${apiURL}/api`,
});

export default api;
