import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectArtistsFetching } from './artistsSlice';
import React, { useEffect } from 'react';
import { fetchArtists } from './artistsThunks';
import { Alert, CircularProgress, Grid2, Typography } from '@mui/material';
import ArtistCard from './components/ArtistCard';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isFetching = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no artists here!
    </Alert>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (artists.length > 0) {
    content = artists.map((artist) => (
      <ArtistCard key={artist._id} artist={artist} />
    ));
  }

  return (
    <Grid2 container spacing={3} direction="column" mt={3}>
      <Grid2>
        <Typography variant="h4">Artists</Typography>
      </Grid2>
      <Grid2 container justifyContent="space-between">
        {content}
      </Grid2>
    </Grid2>
  );
};

export default Artists;
