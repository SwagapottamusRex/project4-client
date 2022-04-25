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

export const getAllThreads = async () => {
  const options = {
    method: 'GET',
    url: `https://pixelprojectapp.herokuapp.com/threads/`,
  };

  const { data } = await axios.request(options);
  return data;
};


export const createThread = async (credentials) => {
  const options = {
    method: 'POST',
    url: 'https://pixelprojectapp.herokuapp.com/thread/create',
    data: credentials,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data.message;
};

export const getAllComments = async () => {
  const options = {
    method: 'GET',
    url: `https://pixelprojectapp.herokuapp.com/comments/`,
  };

  const { data } = await axios.request(options);
  return data;
};

export const createComment = async (credentials) => {
  const options = {
    method: 'POST',
    url: 'https://pixelprojectapp.herokuapp.com/comment/create',
    data: credentials,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data.message;
};


export const updateCommunity = async (credentials, communityId) => {
  const options = {
    method: 'PUT',
    url: `https://pixelprojectapp.herokuapp.com/communities/update/${communityId}`,
    data: credentials,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data.message;
};

export const getAllPixels = async () => {
  const options = {
    method: 'GET',
    url: `https://pixelprojectapp.herokuapp.com/pixels`,
  };

  const { data } = await axios.request(options);
  return data;
};

export const getAllColors = async () => {
  const options = {
    method: 'GET',
    url: `https://pixelprojectapp.herokuapp.com/colors`,
  };

  const { data } = await axios.request(options);
  return data;
};


export const createPixel = async (credentials) => {
  const options = {
    method: 'POST',
    url: 'https://pixelprojectapp.herokuapp.com/pixel/create/',
    data: credentials,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};