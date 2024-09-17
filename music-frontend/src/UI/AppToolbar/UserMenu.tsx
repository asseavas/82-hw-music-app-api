import React from 'react';
import { User } from '../../types';
import { Grid2, Typography } from '@mui/material';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  return (
    <Grid2 component={Typography} variant="h5">
      {user.username}
    </Grid2>
  );
};

export default UserMenu;
