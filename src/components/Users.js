import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
export default ({ users, toggleUser }) => {
  return (
    <ListGroup>
      {users.map(user => (
        <ListGroupItem
          key={user._id}
          id={user._id}
          onClick={e => toggleUser(user)}
        >
          {' '}
          {user.name} <small>{`@${user.username}`}</small>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
