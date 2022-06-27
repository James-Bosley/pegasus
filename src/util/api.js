import axios from "axios";

const API_URL = "http://localhost:8080/v1";

const expressApi = {
  async getUser() {
    try {
      const { data } = await axios.get(`${API_URL}/profile`, { withCredentials: true });
      return data;
    } catch (err) {}
  },

  async loginLocal(account) {
    const { data } = await axios.post(`${API_URL}/login/local`, account, { withCredentials: true });
    return data;
  },
};

export default expressApi;
