import axios from 'axios';

export const registerUser = async (user) => {
  console.log('user', user)
  const options = {
    method: 'POST',
    url: 'https://pixelprojectapp.herokuapp.com/authentication/register/',
    data: user,
  };
  console.log('options',options)
  const { data }  = await axios.request(options);
  console.log( data )
  return data;
};

export const getUser = async (userId) => {
  const options = {
    method: 'GET',
    url: `https://pixelprojectapp.herokuapp.com/owners/${userId}`,
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
    url: 'https://pixelprojectapp.herokuapp.com/authentication/login/',
    data: credentials,
  };
  console.log('options', options);
  const { data } = await axios.request(options);
  console.log('login data', data)
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
