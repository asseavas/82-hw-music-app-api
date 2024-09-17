import AppToolbar from './UI/AppToolbar/AppToolbar';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import OneArtist from './features/artists/OneArtist';
import OneAlbum from './features/albums/OneAlbum';
import Register from './features/users/Register';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/artists/:id" element={<OneArtist />} />
          <Route path="/albums/:id" element={<OneAlbum />} />
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="*"
            element={<Typography variant="h1">Not found</Typography>}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
