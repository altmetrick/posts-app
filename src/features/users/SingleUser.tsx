import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import { selectUserById } from './usersSlice';
import { selectAllPosts } from '../posts';

const SingleUser = () => {
  const { userId } = useParams();

  const user = useAppSelector(selectUserById(userId || '0000'));
  const posts = useAppSelector(selectAllPosts);

  if (!user) {
    return (
      <section>
        <h2>User Not Found!</h2>
      </section>
    );
  }

  const usersOrderedPosts = posts
    .filter((post) => post.userId === userId)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = usersOrderedPosts.map((post, i) => {
    return (
      <div key={post.id}>
        <span>{i + 1}. &nbsp;</span>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </div>
    );
  });

  return (
    <div className="user">
      <h3>{user.name}</h3>
      <div className="user__info">
        <p>username: {user.username}</p>
        <p>email: {user.email}</p>
        <p>phone: {user.phone}</p>
        <p>
          website: <a href="#">{user.website}</a>
        </p>
      </div>
      <div>
        <h4>Posts</h4>
        <div>{renderedPosts}</div>
      </div>
    </div>
  );
};

export default SingleUser;
