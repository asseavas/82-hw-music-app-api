import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectArtistsFetching } from './artistsSlice';
import React, { useEffect } from 'react';
import { fetchArtists } from './artistsThunks';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import ArtistCard from './components/ArtistCard';
import { ContentContainer } from '../../constants';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isFetching = useAppSelector(selectArtistsFetching);

  let content: React.ReactNode = (
    <Grid2 container mt={5} mb={5}>
      <Grid2 component={Typography} variant="body1" color="text.secondary">
        There are no artists here!
      </Grid2>
    </Grid2>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (artists.length > 0) {
    content = artists.map((artist) => (
      <ArtistCard key={artist._id} artist={artist} />
    ));
  }

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <ContentContainer
      container
      direction="column"
      spacing={3}
      sx={{ paddingInline: '25px', mt: 4, pt: 4 }}
    >
      <Grid2>
        <Typography variant="h4">Artists</Typography>
      </Grid2>
      <Grid2 container justifyContent="space-between">
        {content}
      </Grid2>
    </ContentContainer>
  );
};

export default Artists;
