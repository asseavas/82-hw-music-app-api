import React from 'react';
import { AlbumTrack, User } from '../../../types';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { TrackItem } from '../../../constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Props {
  track: AlbumTrack;
  user: User | null;
  onClick: VoidFunction;
}

const AlbumTrackItem: React.FC<Props> = ({ track, user, onClick }) => {
  return (
    <TrackItem>
      <Typography sx={{ width: '30px' }}>{track.number}</Typography>
      {user && (
        <Tooltip title="Play">
          <IconButton onClick={onClick}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
      )}
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
