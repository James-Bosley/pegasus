import axios from "axios";

const API_URL = "http://localhost:8080/v1";

const expressApi = {
  getUser() {
    return axios.get(`${API_URL}/profile`, { withCredentials: true });
  },

  loginLocal(account) {
    return axios.post(`${API_URL}/login/local`, account, { withCredentials: true });
  },

  logout() {
    return axios.get(`${API_URL}/logout`, { withCredentials: true });
  },

  addUser(user) {
    return axios.post(`${API_URL}/signup/local`, user, { withCredentials: true });
  },

  editProfile(user) {
    return axios.put(`${API_URL}/profile`, user, { withCredentials: true });
  },

  editPassword(password, newPassword) {
    return axios.put(`${API_URL}/password`, { password, newPassword }, { withCredentials: true });
  },
};

export default expressApi;
