import React from 'react';

const Home = () => {
  return (
    <section className='hero is-fullheight-with-navbar' id='home-background'>
      <div className='hero-body'>
        <div className='home-container'>
          <h1
            className='title has-text-centered has-text-danger'
            id='welcome-message'
          >
            Pixelated
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Home;
