import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCommunityById, getThreadById } from '../api/pixel';
import { getLoggedInUserId } from '../lib/auth';

const Thread = () => {
  const [thread, setThread] =React.useState('')

  const { id } = useParams();

  React.useEffect(() => {
    const getData = async () => {
      const thread = await getThreadById(id);
      setThread(thread);
      console.log(thread)
    };
    getData();
  }, []);


  if (!thread) {
    return <p>loading...</p>;
  }
  return <>
  <p>
    Thread Title: {thread.title}
  </p>
  <p>
    All Replies: {thread.reply_thread}
  </p>
  </>
}

export default Thread