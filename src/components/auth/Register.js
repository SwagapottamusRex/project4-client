import React from 'react';
import { registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [usernameValue, setUsernameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
  const [imageValue, setImageValue] = React.useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordValue(e.target.value);
  };
  const handleImageChange = (e) => {
    setImageValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      try {
        await registerUser({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          password_confirmation: confirmPasswordValue,
          image: imageValue
        });
        navigate('/login');
      } catch (err) {
        console.log('Error', err);
      }
    };
    getData();
  };

  return (
    <div
      className='hero is-fullheight-with-navbar makeBackgroundLogin'
      id='register-background'
    >
      <body className='register-container'>
        <div>
          <form className='box' onSubmit={handleSubmit}>
            <div className='field'>
              <label htmlFor='username' className='label'>
                Username
              </label>
              <p class='control has-icons-left has-icons-right'>
                <input
                  class='input'
                  type='username'
                  placeholder='Username'
                  value={usernameValue}
                  onChange={handleUsernameChange}
                  id='username'
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-user'></i>
                </span>
                <span class='icon is-small is-right'>
                  <i class='fas fa-check'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <label htmlFor='email' className='label'>
                Email
              </label>
              <p class='control has-icons-left has-icons-right'>
                <input
                  class='input'
                  type='email'
                  placeholder='Email'
                  value={emailValue}
                  onChange={handleEmailChange}
                  id='email'
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-envelope'></i>
                </span>
                <span class='icon is-small is-right'>
                  <i class='fas fa-check'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <label htmlFor='password' className='label'>
                Password
              </label>
              <p class='control has-icons-left has-icons-right'>
                <input
                  class='input'
                  type='password'
                  placeholder='Password'
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  id='password'
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-lock'></i>
                </span>
                <span class='icon is-small is-right'>
                  <i class='fas fa-check'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <label htmlFor='passwordConfirmation' className='label'>
                Password Confirmation
              </label>
              <p class='control has-icons-left has-icons-right'>
                <input
                  class='input'
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPasswordValue}
                  onChange={handleConfirmPasswordChange}
                  id='password-confirmation'
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-lock'></i>
                </span>
                <span class='icon is-small is-right'>
                  <i class='fas fa-check'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <label htmlFor='image' className='label'>
                Image
              </label>
              <p class='control has-icons-left has-icons-right'>
                <input
                  class='input'
                  type='text'
                  placeholder='Insert Image Link'
                  value={imageValue}
                  onChange={handleImageChange}
                  id='image'
                />
                <span class='icon is-small is-left'>
                  <i class='fas fa-image'></i>
                </span>
                <span class='icon is-small is-right'>
                  <i class='fas fa-check'></i>
                </span>
              </p>
            </div>

            <button
              className='button is-primary is-fullwidth'
              type='submit'
              value='Register'
            >
              <p>Register</p>
              <span class='icon'>
                <i class='fas fa-user'></i>
              </span>
            </button>
          </form>
        </div>
      </body>
    </div>
  );
};

export default Register;
