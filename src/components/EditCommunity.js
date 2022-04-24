import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCommunityById } from '../api/pixel';

function CommunityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = React.useState({
    name: '',
    image: '',
   
  });

  React.useEffect(() => {
    const getData = async () => {
      const community = await getCommunityById(id);
      setCommunity(community);
    };
    getData();
  }, []);

  function handleChange(event) {
    setCommunity({
      ...community,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await updatePodcast(community, id);
        navigate('/podcasts');
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }

  // function handleIsActive(event) {
  //   event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle(
  //     'is-active'
  //   );
  //   event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle(
  //     'is-active'
  //   );
  //   event.target.parentElement.parentElement.parentElement.classList.toggle(
  //     'is-active'
  //   );
  //   event.target.parentElement.parentElement.classList.toggle('is-active');
  // }

  // function capitalizeFirstLetter(searchField) {
  //   return searchField.charAt(0).toUpperCase() + searchField.slice(1);
  // }

  

  return (
    <section>
      <div className='container mt-6'>
        <div className='columns'>
          <form
            className='column is-half is-offset-one-quarter box'
            onSubmit={handleSubmit}
          >
            <div className='field'>
              <label className='label'>Title*</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Podcast Title'
                  name='title'
                  onChange={handleChange}
                  value={podcast.title}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Description*</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Description'
                  name='description'
                  onChange={handleChange}
                  value={podcast.description}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Release Year*</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Year'
                  name='year'
                  onChange={handleChange}
                  value={podcast.year}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Image Link*</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Image link'
                  name='img'
                  onChange={handleChange}
                  value={podcast.img}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Duration (min)</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Duration'
                  name='duration'
                  onChange={handleChange}
                  value={podcast.duration}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Host</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Host'
                  name='host'
                  onChange={handleChange}
                  value={podcast.host}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Guest(s)</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Guest(s)'
                  name='guests'
                  onChange={handleChange}
                  value={podcast.guests}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Genre</label>
              <div className='dropdown' onClick={handleIsActive}>
                <div className='dropdown-trigger'>
                  <div
                    className='button'
                    aria-haspopup='true'
                    aria-controls='dropdown-menu3'
                  >
                    <span>
                      Selected Genre: {capitalizeFirstLetter(podcast.genre)}
                    </span>
                    <span className='icon is-small'>
                      <i className='fas fa-angle-down' aria-hidden='true'></i>
                    </span>
                  </div>
                </div>
                <div className='dropdown-menu' id='dropdown-menu3' role='menu'>
                  <div
                    className='dropdown-content'
                    name='selectList'
                    id='selectList'
                    onClick={handleSelect}
                  >
                    <a className='dropdown-item' id='arts'>
                      Arts &amp; Entertainment
                    </a>
                    <a className='dropdown-item' id='business'>
                      Business &amp; Investment
                    </a>
                    <a className='dropdown-item' id='comedy'>
                      Comedy
                    </a>
                    <a className='dropdown-item' id='crime'>
                      Crime
                    </a>
                    <a className='dropdown-item' id='culture'>
                      Culture
                    </a>
                    <a className='dropdown-item' id='environment'>
                      Environment/Science
                    </a>
                    <a className='dropdown-item' id='food'>
                      Food &amp; Drink
                    </a>
                    <a className='dropdown-item' id='health'>
                      Health
                    </a>
                    <a className='dropdown-item' id='miscellaneous'>
                      Miscellaneous
                    </a>
                    <a className='dropdown-item' id='news'>
                      News &amp; Current Affairs
                    </a>
                    <a className='dropdown-item' id='politics'>
                      Politics
                    </a>
                    <a className='dropdown-item' id='sports'>
                      Sports
                    </a>
                    <a className='dropdown-item' id='technology'>
                      Technology
                    </a>
                    <a className='dropdown-item' id='travel'>
                      Travel
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className='field'>
              <button
                type='submit'
                className='button is-warning is-fullwidth'
                onSubmit={handleSubmit}
              >
                <p>Update my Podcast!</p>
                <span className='icon'>
                  <i className='icon fas fa-check-circle'></i>
                </span>
              </button>
            </div>
            <p>* is a required field!</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CommunityEdit;
