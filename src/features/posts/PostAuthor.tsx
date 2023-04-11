import React from 'react';
import { useAppSelector } from '../../app/store';
import { selectAllUsers } from '../users';
import { Link } from 'react-router-dom';

const PostAuthor: React.FC<{ userId: string }> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers);

  const author = users.find((user) => user.id === Number(userId));

  return (
    <span>
      by <Link to={`/users/${author?.id}`}>{author ? author.name : 'unknown'}</Link>
    </span>
  );
};

export default PostAuthor;
