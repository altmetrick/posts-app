import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectAllPosts } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id} className="post">
      <h3 className="post__title">{post.title}</h3>
      <p className="post__content">{post.content.substring(0, 100)}...</p>

      <p className="post__info">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
    </article>
  ));

  return (
    <section className="posts-list margin-top-1">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
