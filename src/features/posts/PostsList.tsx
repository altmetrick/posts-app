import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from './postsSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(getPostsStatus);
  const posts = useAppSelector(selectAllPosts);
  const error = useAppSelector(getPostsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  //Sort posts by date
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => {
    return <PostExcerpt key={post.id} post={post} />;
  });

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    //Sort posts by date
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    const renderedPosts = orderedPosts.map((post) => {
      return <PostExcerpt key={post.id} post={post} />;
    });
    content = renderedPosts;
  } else if (status === 'failed') {
    content = <div>{error?.message || 'Error'}</div>;
  }

  return (
    <section className="posts-list margin-top-1">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
