import React from 'react';
import { User } from '../../types';
import { Grid2, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  return (
    <Grid2 container alignItems="center" spacing={4}>
      <Grid2 component={Typography} variant="h5">
        {user.username}
      </Grid2>
      <StyledLink to="/track_history">Tracks history</StyledLink>
    </Grid2>
  );
};

export default UserMenu;
