import React, { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { deletePost, selectPostById, updatePost } from './postsSlice';
import { selectAllUsers, selectUserById } from '../users';

const EditPostForm = () => {
  const dispatch = useAppDispatch();

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useAppSelector(selectPostById(postId as string));

  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    );
  }

  const users = useAppSelector(selectAllUsers);
  const author = useAppSelector(selectUserById(post.userId));

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [reqStatus, setReqStatus] = useState('idle');

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);
  const onAuthorChange = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const canSave = title && body && userId;

  const handleSavePost = () => {
    if (canSave) {
      try {
        setReqStatus('pending');
        const postData = {
          id: post.id,
          userId: post.userId,
          title,
          body,
        };

        dispatch(updatePost(postData)).unwrap();

        setTitle('');
        setBody('');
        setUserId('');

        navigate('/');
      } catch (error) {
        console.log(error);
      } finally {
        setReqStatus('idle');
      }
    }
  };
  const handleDeletePost = () => {
    if (post) {
      try {
        setReqStatus('pending');
        dispatch(deletePost(post.id)).unwrap();
        navigate('/');
      } catch (error) {
        console.log(error);
      } finally {
        setReqStatus('idle');
      }
    }
  };

  const authorIdsOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <section className="margin-top-1">
      <h2>Edit Post</h2>
      <form className="post-form">
        <div className="flex-column">
          <label htmlFor="postTitle">Title</label>
          <input id="postTitle" name="postTitle" value={title} onChange={onTitleChange} />
        </div>

        <div className="flex-column">
          <label htmlFor="postAuthor">Author</label>
          <select id="postAuthor" value={userId} onChange={onAuthorChange}>
            <option value={author?.id}>{author?.name}</option>
            {authorIdsOptions}
          </select>
        </div>

        <div className="flex-column">
          <label htmlFor="postBody">Title</label>
          <textarea id="postBody" name="postBody" value={body} onChange={onBodyChange} />
        </div>

        <button disabled={!canSave} type="button" onClick={handleSavePost}>
          Save Post
        </button>

        <button className="delete-button" type="button" onClick={handleDeletePost}>
          DeletePost
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
