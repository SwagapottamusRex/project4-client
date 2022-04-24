import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCommunityById, updateCommunity } from '../api/pixel';

function CommunityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = React.useState({
    name: '',
    image: '',
   
  });

  React.useEffect(() => {
    const getData = async () => {
      const communityOld = await getCommunityById(id);
      setCommunity(communityOld);
    };
    getData();
  }, []);

  function handleChange(event) {
    console.log('target name',event.target.name)
    setCommunity({
      ...community,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        console.log('community',community)
        console.log('id',id)
        delete community.creator
        await updateCommunity(community, id);
        navigate(`/community/${id}`);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }

  

  return (
    <section>
      <div className='container mt-6'>
        <div className='columns'>
          <form
            className='column is-half is-offset-one-quarter box'
            onSubmit={handleSubmit}
          >
            <div className='field'>
              <label className='label'>Name*</label>
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
              <label className='label'>Image*</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Image'
                  name='image'
                  onChange={handleChange}
                  value={community.image}
                />
              </div>
            </div>

            <div className='field'>
              <button
                type='submit'
                className='button is-warning is-fullwidth'
                onSubmit={handleSubmit}
              >
                <p>Update Community!</p>
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
