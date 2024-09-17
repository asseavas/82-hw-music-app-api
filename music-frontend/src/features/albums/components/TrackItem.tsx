import React from 'react';
import { AlbumTrack } from '../../../types';
import { Box, Typography } from '@mui/material';
import { TrackItem } from '../../../constants';

interface Props {
  track: AlbumTrack;
}

const AlbumTrackItem: React.FC<Props> = ({ track }) => {
  return (
    <TrackItem>
      <Typography sx={{ width: '30px' }}>{track.number}</Typography>
      <Typography>{track.title}</Typography>
      <Box ml="auto" sx={{ width: '40px' }}>
        <Typography mr="auto" color="text.secondary">
          {track.duration}
        </Typography>
      </Box>
    </TrackItem>
  );
};

export default AlbumTrackItem;
