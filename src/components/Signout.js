import React from 'react';
import { Button } from 'reactstrap';

export default ({ signout }) => {
  return (
    <Button onClick={signout} size="lg" block>
      Signout
    </Button>
  );
};
