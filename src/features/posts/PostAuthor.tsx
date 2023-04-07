import React from 'react';
import { useAppSelector } from '../../app/store';
import { selectAllUsers } from '../users';

const PostAuthor: React.FC<{ userId: string }> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : 'unknown'}</span>;
};

export default PostAuthor;
