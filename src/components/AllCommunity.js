import React from 'react'
import { getAllCommunities } from '../api/pixel'
import { getLoggedInUserId } from '../lib/auth';
import { Link, useNavigate } from 'react-router-dom';



const CommunityIndex = () => {
  const [community, setCommunity] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      const communityData = await getAllCommunities();
      setCommunity(communityData);
    };
    getData();
  }, []);


  return (
    <>
      <section className='hero is-fullheight-with-navbar' id='index-container'>
        <h1 className='title'></h1>
        {community ? (
          <div className='container is-dark'>
            <div className='columns is-multiline' id='podcast-inner'>
              {community.map((communityitem) => (
                <div
                  key={communityitem.id}
                  className='column card  is-one-half'
                  id='podcast-card'
                >
                  <Link to={`/community/${communityitem.id}`}>
                    <p>
                      <b>Community Name:</b> {communityitem.name}
                    </p>
                    <hr></hr>
                    <p>
                      <b>Community Image:</b>
                      <img src={communityitem.image}></img>
                    </p>
                    <p>
                      Created By: {communityitem.creator.username}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
            {getLoggedInUserId() && (
              <Link to='/createcommunity'>
                <div>
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