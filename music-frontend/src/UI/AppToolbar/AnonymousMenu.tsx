import { Button, Grid2 } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Grid2>
      <Button component={NavLink} to="/register" color="inherit">
        Sign up
      </Button>
      <Button component={NavLink} to="/login" color="inherit">
        Sign in
      </Button>
    </Grid2>
  );
};

export default AnonymousMenu;
