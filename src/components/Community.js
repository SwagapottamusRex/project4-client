import React from 'react'
import { getAllCommunities } from '../api/pixel'


const CommunityIndex = () => {
  const [community, setCommunity] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      const communityData = await getAllCommunities();
      setCommunity(communityData);
    };
    getData();
  }, []);

  console.log('communtiy', community);

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
                  className='column card  is-one-fifth changethis'
                  id='podcast-card'
                >
                  <p><b>Community Name:</b> {communityitem.name}</p>
                  <hr></hr>
                  <p>
                    <b>Community Image:</b>
                  <img src={communityitem.image}></img>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>loading...</p>
        )}
      </section>
    </>
  );







}

export default CommunityIndex