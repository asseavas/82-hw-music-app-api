import React, { useState } from 'react';
import { User } from '../../types';
import { Button, Grid2, Menu, MenuItem } from '@mui/material';
import { StyledButton, StyledLink } from '../../constants';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid2 container>
      <Grid2 component={StyledLink} to="/track_history">
        {user.username}'s tracks history
      </Grid2>
      <Grid2 container spacing={1} alignItems="center">
        <Grid2>
          <Button onClick={handleClick} color="inherit">
            Add new
          </Button>
          <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
            <MenuItem component={StyledLink} to="/artists/new">Artist</MenuItem>
            <MenuItem component={StyledLink} to="/albums/new">Album</MenuItem>
            <MenuItem component={StyledLink} to="/tracks/new">Track</MenuItem>
          </Menu>
        </Grid2>
        <Grid2 component={StyledButton} variant="outlined" color="white" onClick={handleLogout}>
          Logout
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default UserMenu;
