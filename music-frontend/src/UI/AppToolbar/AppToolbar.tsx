import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
      <AppBar position="sticky" sx={{ background: 'none' }}>
        <Toolbar sx={{ margin: '0 24px' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">PlayCloud</StyledLink>
          </Typography>
          <Box>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
