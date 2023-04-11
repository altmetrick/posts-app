import React from 'react';
import { useAppSelector } from '../../app/store';
import { selectAllUsers } from './usersSlice';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const users = useAppSelector(selectAllUsers);

  let content = users.map((user, i) => {
    return (
      <div key={user.id} className="user-excerpt">
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </div>
    );
  });

  return <div className="users-list">{content}</div>;
};

export default UsersList;
