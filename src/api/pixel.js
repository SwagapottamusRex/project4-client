import axios from 'axios';

export const getAllCommunities = async () => {
  const options = {
    method: 'GET',
    url: 'https://pixelprojectapp.herokuapp.com/communities/',
  };

  const { data } = await axios.request(options);
  return data;
};

export const createCommunity = async (credentials) => {
  const options = {
    method: 'POST',
    url: 'https://pixelprojectapp.herokuapp.com/community/create',
    data: credentials,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
 
  const { data } = await axios.request(options);


  return data.message;
};

export const getCommunityById = async (communityId) => {
  const options = {
    method: 'GET',
    url: `https://pixelprojectapp.herokuapp.com/communities/${communityId}`,
  };

  const { data } = await axios.request(options);
  return data;
};


export const deleteCommunity = async (communityId) => {
  const options = {
    method: 'DELETE',
    url: `https://pixelprojectapp.herokuapp.com/communities/${communityId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);
  return data;
};

export const getThreadById = async (threadId) => {
  const options = {
    method: 'GET',
    url: `https://pixelprojectapp.herokuapp.com/threads/${threadId}`,
  };

  const { data } = await axios.request(options);
  return data;
};