import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect } from 'react';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import { ContentContainer } from '../../constants';
import { selectHistoryTracks } from './tracksSlice';
import { selectTracksFetching } from '../albums/albumsSlice';
import TrackHistoryItem from './components/TrackHistoryItem';
import { fetchTrackHistory } from './tracksThunks';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectHistoryTracks);
  const isFetching = useAppSelector(selectTracksFetching);

  let content: React.ReactNode = (
    <Grid2 container mt={5} mb={5}>
      <Grid2 component={Typography} variant="body1" color="text.secondary">
        There are no tracks in history!
      </Grid2>
    </Grid2>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (trackHistory.length > 0) {
    content = trackHistory.map((trackHistory) => (
      <TrackHistoryItem track={trackHistory} />
    ));
  }

  useEffect(() => {
    dispatch(fetchTrackHistory());
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

export default TrackHistory;
