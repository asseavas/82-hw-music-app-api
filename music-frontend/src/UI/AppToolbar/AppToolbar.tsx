import {
  AppBar,
  Container,
  Grid2,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ mb: 2, background: 'none', paddingTop: '15px' }}
    >
      <Toolbar>
        <Grid2 container justifyContent="space-between" align-items="center">
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Container maxWidth="xl">
              <StyledLink to="/">PlayCloud</StyledLink>
            </Container>
          </Typography>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
