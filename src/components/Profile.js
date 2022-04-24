import React from 'react'
import { Link } from 'react-router-dom';
import { getUser } from "../api/auth";
import { getLoggedInUserId }  from "../lib/auth"


const MyProfile = () => {
  const [userObject, setUserObject] = React.useState(null);
  React.useEffect(() => {
    const getData = async () => {
      const userId = getLoggedInUserId();
      console.log('userId',userId)
      const userObject = await getUser(userId);
      console.log(userObject)
      setUserObject(userObject);
    };
    getData();
  }, []);

  if (!userObject) {
    return <p>loading user info...</p>;
  }

  

  return (
    <>
      <h1>My Profile</h1>
      <div>
        <div>
          <h2>Welcome: {userObject.username}!</h2>
          <div>
            <ul>
              <li><img src={userObject.image}></img>Image: {userObject.image}</li>
              <li>Email:{userObject.email}</li>
              <li>Date Joined:{userObject.date_joined}</li>
            </ul>
          
          </div>
        </div>
      </div>
    </>
  );

}

export default MyProfile