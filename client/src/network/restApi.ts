import axios from 'axios';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const restApi = {
  authenticate: async (email: string, password: string) => {
    return await axios({
      method: 'POST',
      url: '/authenticate',
      data: { email, password },
      headers: defaultHeaders,
    });
  },

  logout: async () => {
    return await axios({
      method: 'POST',
      url: '/logout',
      headers: defaultHeaders,
    });
  },

  checkLoginStatus: async () => {
    return await axios({
      method: 'GET',
      url: '/checkToken',
    });
  },
};

export default restApi;
