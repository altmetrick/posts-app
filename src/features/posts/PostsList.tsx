import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts, selectPostsError, selectPostsStatus, selectAllPosts } from './postsSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
  const status = useAppSelector(selectPostsStatus);
  const posts = useAppSelector(selectAllPosts);
  const error = useAppSelector(selectPostsError);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    //Sort posts by date
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => {
      return <PostExcerpt key={post.id} post={post} />;
    });
  } else if (status === 'failed') {
    content = <div>{error?.message || 'Error'}</div>;
  }

  return <section className="posts-list margin-top-1">{content}</section>;
};

export default PostsList;
