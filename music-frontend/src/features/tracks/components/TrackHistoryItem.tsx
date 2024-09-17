import React from 'react';
import { HistoryTrack } from '../../../types';
import { Box, Typography } from '@mui/material';
import { TrackItem } from '../../../constants';

interface Props {
  track: HistoryTrack;
}

const AlbumTrackItem: React.FC<Props> = ({ track }) => {
  return (
    <TrackItem>
      <Typography>{track.title}</Typography>
      <Typography>{track.title}</Typography>
      <Box ml="auto" sx={{ width: '40px' }}>
        <Typography mr="auto" color="text.secondary">
          {track.datetime}
        </Typography>
      </Box>
    </TrackItem>
  );
};

export default AlbumTrackItem;
