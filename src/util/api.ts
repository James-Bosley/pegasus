import axios, { AxiosResponse } from "axios";

// Sets URL based on environment.
export const API_URL: string = process.env.REACT_APP_API || "https://api.gochamp.co.uk";

const expressApi = {
  getUser(): Promise<AxiosResponse> {
    return axios.get(`${API_URL}/v1/profile`, { withCredentials: true });
  },

  loginLocal(account: object): Promise<AxiosResponse> {
    return axios.post(`${API_URL}/v1/login/local`, account, { withCredentials: true });
  },

  logout(): Promise<AxiosResponse> {
    return axios.get(`${API_URL}/v1/logout`, { withCredentials: true });
  },

  addUser(user: object): Promise<AxiosResponse> {
    return axios.post(`${API_URL}/v1/signup/local`, user, { withCredentials: true });
  },

  editProfile(user: object): Promise<AxiosResponse> {
    return axios.put(`${API_URL}/v1/profile`, user, { withCredentials: true });
  },

  editPassword(password: string, newPassword: string): Promise<AxiosResponse> {
    return axios.put(
      `${API_URL}/v1/password`,
      { password, newPassword },
      { withCredentials: true }
    );
  },

  getReport(): Promise<AxiosResponse> {
    return axios.get(`${API_URL}/v1/report`, { responseType: "blob", withCredentials: true });
  },
};

export default expressApi;
