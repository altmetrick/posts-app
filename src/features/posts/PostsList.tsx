import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectAllPosts } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButtons';

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);

  //Sort posts by date
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id} className="post">
      <h3 className="post__title">{post.title}</h3>
      <p className="post__content">{post.content.substring(0, 100)}...</p>

      <p className="post__info">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButtons post={post} />
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
