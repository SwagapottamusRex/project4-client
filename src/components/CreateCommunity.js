import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCommunity } from '../api/pixel';
import { getLoggedInUserId } from '../lib/auth';

function CommunityNew() {
  const navigate = useNavigate();
  const [community, setCommunity] = React.useState({
    image: '',
    name: '',
    
  });


  function handleChange(event) {
    setCommunity({ ...community, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        await createCommunity(community);
        navigate('/community');
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }
  return (
    <section className='mt-2 setCreateBackgroundThread'>
      <div className='container'>
        <div className='columns'>
          <form
            className='my-3 column is-half is-offset-one-quarter box'
            onSubmit={handleSubmit}
          >
            <div className='field'>
              <label className='label'>Name</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Community Name'
                  name='name'
                  onChange={handleChange}
                  value={community.name}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Image</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Image Link'
                  name='image'
                  onChange={handleChange}
                  value={community.image}
                />
              </div>
            </div>

            <div className='field'>
              <button
                type='submit'
                className='button is-success is-fullwidth'
                onSubmit={handleSubmit}
              >
                <p>Make Community!</p>
                <span className='icon'>
                  <i className='icon fas fa-check-circle'></i>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default CommunityNew