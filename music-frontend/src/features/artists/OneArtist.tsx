import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneArtist, selectOneArtistFetching } from './artistsSlice';
import { fetchOneArtist } from './artistsThunks';
import { Button, CircularProgress, Grid2, Typography } from '@mui/material';
import { fetchAlbums } from '../albums/albumsThunks';
import { selectAlbums } from '../albums/albumsSlice';
import AlbumCard from '../albums/components/AlbumCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OneArtist = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectOneArtist);
  const albums = useAppSelector(selectAlbums);
  const isFetching = useAppSelector(selectOneArtistFetching);

  useEffect(() => {
    dispatch(fetchOneArtist(id));
    dispatch(fetchAlbums(id));
  }, [dispatch, id]);

  return (
    <Grid2 container direction="column" spacing={2}>
      <Grid2>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/"
          sx={{ color: 'lightGrey' }}
        >
          Back to main
        </Button>
      </Grid2>
      {isFetching && (
        <Grid2>
          <CircularProgress />
        </Grid2>
      )}
      {artist && (
        <>
          <Grid2 container sx={{ background: artist.image, height: '250px' }}>
            <Grid2 component={Typography} variant="h4">
              {artist.name}
            </Grid2>
            <Grid2 component={Typography} variant="h6">
              {artist.information || 'No information available'}
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} mt={3}>
            {albums && albums.length > 0 ? (
              albums.map((album) => <AlbumCard album={album} key={album._id} />)
            ) : (
              <Typography variant="body1">No albums available</Typography>
            )}
          </Grid2>
        </>
      )}
    </Grid2>
  );
};

export default OneArtist;
