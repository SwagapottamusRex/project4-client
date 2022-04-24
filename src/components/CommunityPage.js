import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth';


import { updateUser, getUser } from '../api/auth';
import { deleteCommunity, getCommunityById } from '../api/pixel';

const CommunityCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [community, setCommunity] = React.useState(null);
  const [userObject, setUserObject] = React.useState('');

  const userId = getLoggedInUserId();

  React.useEffect(() => {
    const getDataAndUpdate = async () => {
      try {
        const community = await getCommunityById(id);
        setCommunity(community);

        const user = await getUser(userId);
        
        setUserObject(user);
      } catch (error) {
        console.error(error);
      }
    };
    getDataAndUpdate();
  }, []);

  const handleCommunityDelete = async (communityId) => {
    try {
      if (
        confirm(
          'Are you sure you want to delete the community? Press OK to continue!'
        )
      ) {
        await deleteCommunity(communityId);
        navigate('/community');
      }
    } catch (err) {
      console.log(err);
    }
  }
  

  if (!community) {
    return <p>loading...</p>;
  }
  if (!userObject) {
    return <p>loading...</p>;
  }
  console.log('username community creator', community.creator.username);
  console.log('userobject', userObject.username);
  return (
    <div className='container mt-6'>
      <div className='columns'>
        <div className='column is-half'>
          <figure className='image'>
            <img src={community.image} alt={community.name} />
          </figure>
          {userObject.username === community.creator.username && (
            <button
              type='button'
              className='button is-danger mt-4'
              onClick={() => handleCommunityDelete(community.id)}
            >
              <p>Delete Community</p>
              <span className='icon'>
                <i className='icon fas fa-ban'></i>
              </span>
            </button>
          )}
          {/* {getLoggedInUserId() === community.creator.id && (
            <button
              type='button'
              className='button is-warning m-4'
              // onClick={() => navigate(`/community/${community._id}/edit`)}
            >
              <p>Update Community</p>
              <span className='icon'>
                <i className='icon fas fa-info-circle'></i>
              </span>
            </button>
          )} */}
        </div>
        <div className='column is-half'>
          <div className='card'>
            <h2 className='title'>{community.name}</h2>
            <hr></hr>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
