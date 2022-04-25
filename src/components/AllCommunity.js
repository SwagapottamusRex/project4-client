import React from 'react'
import { getAllCommunities } from '../api/pixel'
import { getUser } from '../api/auth'
import { getLoggedInUserId } from '../lib/auth';
import { Link, useNavigate } from 'react-router-dom';



const CommunityIndex = () => {
  const [community, setCommunity] = React.useState(null)
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      const communityData = await getAllCommunities();
      setCommunity(communityData);
      const userInfo = await getUser(getLoggedInUserId())
      setUser(userInfo);
    };
    getData();
  }, []);
  
  return (
    <>
      <section
        className='hero is-fullheight-with-navbar setCreateBackgroundThread'
        id='index-container'
      >
        <h1 className='title'></h1>
        {community ? (
          <div className='container is-dark centerCommunities'>
            <div className='columns is-multiline' id='community-inner'>
              {community.map((communityItem) => (
                <div
                  key={communityItem.id}
                  className='column card  is-one-half centerCommunitiesContent'
                  id='community-card'
                >
                  <Link to={`/community/${communityItem.id}`} className='adjustImageCommunity'>
                    <p className='nameCommunityPage'>
                      <b>Community Name:</b> {communityItem.name}
                    </p>
                    
                    <p>
                      <img src={communityItem.image} className='ajustImageCommunity'></img>
                    </p>
                    <p>Created By: {communityItem.creator.username}</p>
                  </Link>
                  {!user ? (
                    <p></p>
                  ) : (
                    user.username === communityItem.creator.username && (
                      <Link to={`/community/${communityItem.id}/edit`}>
                        <div className='alignEditCommunity'>
                          <p className='fontstyling'>Edit Community</p>
                          <span className='icon'>
                            <i class='fas fa-plus-square'></i>
                          </span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              ))}
            </div>
            {getLoggedInUserId() && (
              <Link to='/createcommunity'>
                <div className='createNewCommunity'>
                  <p className='fontstyling'>Create New Community</p>
                  <span className='icon'>
                    <i class='fas fa-plus-square'></i>
                  </span>
                </div>
              </Link>
            )}
          </div>
        ) : (
          <p>loading...</p>
        )}
      </section>
    </>
  );







}

export default CommunityIndex