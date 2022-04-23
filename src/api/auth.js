import axios from 'axios';

export const registerUser = async (user) => {
  const options = {
    method: 'POST',
    url: '/api/register',
    data: user,
  };
  const { data } = await axios.request(options);
  return data;
};

export const getUser = async (userId) => {
  const options = {
    method: 'GET',
    url: `/api/user/${userId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: '/api/login',
    data: credentials,
  };

  const { data } = await axios.request(options);
  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    window.sessionStorage.removeItem('token');
  }
  return data.message;
};

export const updateUser = async (userId, likedPodcasts) => {
  const options = {
    method: 'PUT',
    url: `/api/user/${userId}`,
    data: { likedPodcasts },
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const data = await axios.request(options);

  return data;
};
