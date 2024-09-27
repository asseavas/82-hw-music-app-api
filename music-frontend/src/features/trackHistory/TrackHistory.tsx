import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CircularProgress, Grid2, IconButton, Typography } from '@mui/material';
import { AlbumTracksInfoContainer, ContentContainer } from '../../constants';
import { selectHistoryTracks, selectHistoryTracksLoading } from './tracksHistorySlice';
import TrackHistoryItem from './components/TrackHistoryItem';
import { fetchTrackHistory } from './tracksHistoryThunks';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectHistoryTracks);
  const isFetching = useAppSelector(selectHistoryTracksLoading);

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
      <TrackHistoryItem key={trackHistory._id} track={trackHistory} />
    ));
  }

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);

  return (
    <ContentContainer
      container
      direction="column"
      spacing={1}
      sx={{ paddingInline: '25px', mt: 4, pt: 4 }}
    >
      <Grid2 mb={3}>
        <Typography variant="h4">Track history</Typography>
      </Grid2>
      <Grid2 container spacing={1} direction="column">
        <AlbumTracksInfoContainer sx={{ borderBottom: 'none' }}>
          <Typography sx={{ width: '350px' }}>Title</Typography>
          <Typography>Artist</Typography>
          <IconButton sx={{ ml: 'auto', width: 2 }} disabled>
            <AccessTimeOutlinedIcon />
          </IconButton>
        </AlbumTracksInfoContainer>
        <Grid2 container direction="column" justifyContent="space-between">
          {content}
        </Grid2>
      </Grid2>
    </ContentContainer>
  );
};

export default TrackHistory;
