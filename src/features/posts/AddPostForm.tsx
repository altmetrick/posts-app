import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { addPost } from './postsSlice';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users';

const AddPostForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onAuthorChange = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const handleSavePost = () => {
    if (title && content) {
      dispatch(addPost({ title, content, userId }));
    }
    setTitle('');
    setContent('');
    setUserId('');
  };

  const authorIdsOptions = useSelector(selectAllUsers).map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave = title && content && userId;

  return (
    <section className="margin-top-1">
      <h2>Add Post</h2>

      <form className="add-post-form">
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
          <label htmlFor="postContent">Content</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChange}
          />
        </div>

        <button type="button" onClick={handleSavePost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
