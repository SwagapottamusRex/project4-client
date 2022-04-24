import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAllComments, getThreadById, createComment } from '../api/pixel';
import { getLoggedInUserId } from '../lib/auth';

const Thread = () => {
  const [thread, setThread] =React.useState('')
  const [comments, setComments] =React.useState('')
  const { id } = useParams();
  const [newComment, setNewComment] = React.useState({
    text: '',
    thread: id,
  })


  React.useEffect(() => {
    const getData = async () => {
      const thread = await getThreadById(id);
      setThread(thread);
      const comments = await getAllComments()
      setComments(comments)
    };
    getData();
  }, []);

  const handleCommentChange = (event) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };
  const handleCommentSubmit = async (e) => {
    await createComment(newComment)
    
  };


  if (!thread) {
    return <p>loading...</p>;
  }
  return (
    <>
      <p>Thread Title: {thread.title}</p>
      <div>
        {!comments ? (
          <p id='noresults'>No Results</p>
        ) : (
          comments.map((replyItem) => {
            if (replyItem.thread === thread.id) {
              return (
                <p key={replyItem.id}>
                  User: <b>{replyItem.creator_of_comment.username}</b><img src={replyItem.creator_of_comment.image}></img> commented:
                  <hr></hr>
                  {replyItem.text}
                </p>
              );
            }
          })
        )}
      </div>
      <div>
        Add reply/comment:
        {getLoggedInUserId() && (
          <form onSubmit={handleCommentSubmit}>
            <div className='form mt-4'>
              <label htmlFor='comment' className='label'>
                Post a comment
              </label>
              <div className='control'>
                <textarea
                  type='text'
                  className='input'
                  name='text'
                  onChange={handleCommentChange}
                />
              </div>
            </div>
            <button
              type='submit'
              className='button is-info mt-4'
              value='Submit Comment'
            >
              <p>Submit Comment</p>
              <span className='icon'>
                <i className='fas fa-reply'></i>
              </span>
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Thread