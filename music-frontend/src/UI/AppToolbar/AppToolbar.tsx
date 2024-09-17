import {
  AppBar,
  Container,
  Grid2,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
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
    <AppBar
      position="sticky"
      sx={{ mb: 2, background: 'none', paddingTop: '15px' }}
    >
      <Toolbar>
        <Grid2 container justifyContent="space-between" align-items="center">
          <Grid2>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <Container maxWidth="xl">
                <StyledLink to="/">PlayCloud</StyledLink>
              </Container>
            </Typography>
          </Grid2>
          {user ? <UserMenu user={user}></UserMenu> : <AnonymousMenu />}
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
