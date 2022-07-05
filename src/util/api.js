import axios from "axios";

const API_URL = process.env.REACT_APP_API || "https://gochamp-server.herokuapp.com";

const expressApi = {
  getUser() {
    return axios.get(`${API_URL}/v1/profile`, { withCredentials: true });
  },

  loginLocal(account) {
    return axios.post(`${API_URL}/v1/login/local`, account, { withCredentials: true });
  },

  logout() {
    return axios.get(`${API_URL}/v1/logout`, { withCredentials: true });
  },

  addUser(user) {
    return axios.post(`${API_URL}/v1/signup/local`, user, { withCredentials: true });
  },

  editProfile(user) {
    return axios.put(`${API_URL}/v1/profile`, user, { withCredentials: true });
  },

  editPassword(password, newPassword) {
    return axios.put(
      `${API_URL}/v1/password`,
      { password, newPassword },
      { withCredentials: true }
    );
  },

  getReport() {
    return axios.get(`${API_URL}/v1/report`, { responseType: "blob", withCredentials: true });
  },
};

export default expressApi;
