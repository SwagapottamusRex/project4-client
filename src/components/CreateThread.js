import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCommunity } from '../api/pixel';
import { getLoggedInUserId } from '../lib/auth';
import { createThread, getAllCommunities } from '../api/pixel'


function ThreadNew() {
  const navigate = useNavigate();
  const [thread, setThread] = React.useState({
    title: '',
    community: '',
  });
  const [communities, setCommunities] = React.useState('')
  const [displayChoice, setDisplayChoice] =React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      const communitiesList = await getAllCommunities();
      setCommunities(communitiesList);

    };
    getData();
  }, []);

  function handleChange(event) {
    setThread({ ...thread, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        await createThread(thread);
        // ! 
        navigate('/community');
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }
  function handleSelect(event) {
    setDisplayChoice(event.target.innerText)
    setThread({
      ...thread,
      community: event.target.id,
    });
  }

    function handleIsActive(event) {
      event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle(
        'is-active'
      );
      event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle(
        'is-active'
      );
      event.target.parentElement.parentElement.parentElement.classList.toggle(
        'is-active'
      );
      event.target.parentElement.parentElement.classList.toggle('is-active');
    }

  return (
    <section className='mt-2'>
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
                  placeholder='Thread Name'
                  name='title'
                  onChange={handleChange}
                  value={thread.title}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Community</label>
              <div className='dropdown' onClick={handleIsActive}>
                <div className='dropdown-trigger'>
                  <div
                    className='button'
                    aria-haspopup='true'
                    aria-controls='dropdown-menu3'
                  >
                    <span>Selected Community:</span>
                    <span className='icon is-small'>
                      <i className='fas fa-angle-down' aria-hidden='true'></i>
                    </span>
                    {!displayChoice ? (
                      <p id='noresults'>Make a Selection</p>
                    ) : (
                        <p>{displayChoice}</p>
                      )
                    }
                  </div>
                </div>

                <div className='dropdown-menu' id='dropdown-menu3' role='menu'>
                  <div
                    className='dropdown-content'
                    name='selectList'
                    id='selectList'
                    onClick={handleSelect}
                  >
                    {!communities.length ? (
                      <p id='noresults'>No Results</p>
                    ) : (
                      communities.map((communitiesItem) => (
                        <a className='dropdown-item' id={communitiesItem.id}>
                          {communitiesItem.name}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='field'>
              <button
                type='submit'
                className='button is-success is-fullwidth'
                onSubmit={handleSubmit}
              >
                <p>Create New Thread!</p>
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
export default ThreadNew;
