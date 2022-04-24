import axios from 'axios';

export const getAllCommunities = async () => {
  const options = {
    method: 'GET',
    url: 'https://pixelprojectapp.herokuapp.com/communities/',
  };

  const { data } = await axios.request(options);
  return data;
};
