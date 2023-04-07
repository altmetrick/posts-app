import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectAllPosts } from './postsSlice';
import PostAuthor from './PostAuthor';

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id} className="post">
      <h3 className="post__title">{post.title}</h3>
      <p className="post__content">{post.content.substring(0, 100)}...</p>
      <PostAuthor userId={post.userId} />
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
