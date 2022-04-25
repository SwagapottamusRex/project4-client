import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth';
import { Link } from 'react-router-dom';

import { updateUser, getUser } from '../api/auth';
import { deleteCommunity, getCommunityById, getAllThreads } from '../api/pixel';

const CommunityCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [community, setCommunity] = React.useState(null);
  const [userObject, setUserObject] = React.useState('');
  const [threads, setThreads] = React.useState('')

  const userId = getLoggedInUserId();

  React.useEffect(() => {
    const getDataAndUpdate = async () => {
      try {
        const community = await getCommunityById(id);
        setCommunity(community);
        const threads = await getAllThreads()
        setThreads(threads)
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
  // if (!threads) {
  //   return <p>loading threads...</p>;
  // }


  return (
    <div className='communityBackground'>
      <div className='container mt-6'>
        <div className='columns'>
          <div className='column is-half useThisOne'>
            <figure className='image'>
              <img
                src={community.image}
                alt={community.name}
                className='communityImage'
              />
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
          </div>
          <div className='column is-half'>
            <div className='card targetCommunityTitle'>
              <h2 className='title '>{community.name}</h2>
              <hr></hr>
              Threads:
              {!threads ? (
                <p id='noresults'>Getting threads...</p>
              ) : (
                threads.map((threadItem) => {
                  if (threadItem.community === community.id) {
                    return (
                      <>
                        <Link to={`/thread/${threadItem.id}`}>
                          <h3 key={threadItem.id}></h3>
                          <div>
                            <p>Thread: {threadItem.title}</p>
                          </div>
                        </Link>
                      </>
                    );
                  }
                })
              )}
            </div>
          {getLoggedInUserId() && (
            <Link to='/createthread'>
              <div className='createNewThread'>
                <p className='fontstyling'>Create New Thread</p>
                <span className='icon'>
                  <i class='fas fa-plus-square'></i>
                </span>
              </div>
            </Link>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
