import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { addPost } from './postsSlice';

const AddPostForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleSavePost = () => {
    if (title && content) {
      dispatch(addPost({ title, content }));
    }
    setTitle('');
    setContent('');
  };

  const canSave = title && content;

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
