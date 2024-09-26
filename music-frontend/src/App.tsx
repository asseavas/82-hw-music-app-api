import AppToolbar from './UI/AppToolbar/AppToolbar';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import OneArtist from './features/artists/OneArtist';
import OneAlbum from './features/albums/OneAlbum';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TrackHistory from './features/tracks/TrackHistory';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import { selectUser } from './features/users/usersSlice';
import { useAppSelector } from './app/hooks';
import NewArtist from './features/artists/NewArtist';
import NewAlbum from './features/albums/NewAlbum';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route
            path="/artists/new"
            element={
            <ProtectedRoute isAllowed={user !== null}><NewArtist /></ProtectedRoute>
            }
          />
          <Route
            path="/albums/new"
            element={
            <ProtectedRoute isAllowed={user !== null}><NewAlbum /></ProtectedRoute>
            }
          />
          <Route
            path="/tracks/new"
            element={
            <ProtectedRoute isAllowed={user !== null}><TrackHistory /></ProtectedRoute>
            }
          />
          <Route path="/artists/:id" element={<OneArtist />} />
          <Route path="/albums/:id" element={<OneAlbum />} />
          <Route
            path="/track_history"
            element={
            <ProtectedRoute isAllowed={user !== null}><TrackHistory /></ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
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
