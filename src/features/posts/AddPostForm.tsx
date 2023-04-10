import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { addNewPost } from './postsSlice';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const [addPostReqStatus, setAddPostReqStatus] = useState('idle');

  const navigate = useNavigate();

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);
  const onAuthorChange = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const handleSavePost = () => {
    if (title && body && userId && addPostReqStatus === 'idle') {
      try {
        setAddPostReqStatus('pending');
        dispatch(addNewPost({ title, body, userId })).unwrap();

        setTitle('');
        setBody('');
        setUserId('');

        navigate('/');
      } catch (error) {
        console.log(error);
      } finally {
        setAddPostReqStatus('idle');
      }
    }
  };

  const authorIdsOptions = useSelector(selectAllUsers).map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave = title && body && userId && addPostReqStatus === 'idle';

  return (
    <section className="margin-top-1">
      <h2>Add Post</h2>

      <form className="post-form">
        <div className="flex-column">
          <label htmlFor="postTitle">Title</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChange}
          />
        </div>

        <div className="flex-column">
          <label htmlFor="postAuthor">Author</label>
          <select id="postAuthor" value={userId} onChange={onAuthorChange}>
            <option value={''}></option>
            {authorIdsOptions}
          </select>
        </div>

        <div className="flex-column">
          <label htmlFor="postBody">Body</label>
          <textarea id="postBody" name="postBody" value={body} onChange={onBodyChange} />
        </div>

        <button type="button" onClick={handleSavePost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
