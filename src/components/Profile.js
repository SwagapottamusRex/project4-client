import React from 'react'
import { getUser } from "../api/auth";
import { getLoggedInUserId }  from "../lib/auth"


const MyProfile = () => {
  const [userObject, setUserObject] = React.useState(null);
  React.useEffect(() => {
    const getData = async () => {
      const userId = getLoggedInUserId();
      const userObject = await getUser(userId);
      setUserObject(userObject);
    };
    getData();
  }, []);

  if (!userObject) {
    return <p>loading user info...</p>;
  }

  

  return (
    <>
    <div className='profileHeader'>
      <h1 className='myProfileText'><b>My Profile</b></h1>
      <div className='profileInfo'>
        <h2>Welcome: {userObject.username}!</h2>
          <ul className='profileDetails'>
            <li>
              <img src={userObject.image} className='shapeImage'></img>
            </li>
            <li>Email: {userObject.email}</li>
            <li>Username: {userObject.username}</li>
            <li>Date Joined: {userObject.date_joined}</li>
          </ul>
      </div>
    </div>
    </>
  );

}

export default MyProfile