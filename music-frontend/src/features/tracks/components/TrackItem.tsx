import React, { useState } from 'react';
import { AlbumTrack, User } from '../../../types';
import { Box, Grid2, IconButton, Typography } from '@mui/material';
import { TrackItem } from '../../../constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LoadingButton } from '@mui/lab';

interface Props {
  track: AlbumTrack;
  user: User | null;
  onClick: VoidFunction;
  addToHistoryLoading: boolean;
  isDeleting: boolean;
  onDelete: VoidFunction;
  isPublication: boolean;
  onPublish: VoidFunction;
}

const AlbumTrackItem: React.FC<Props> = ({
  track,
  user,
  onClick,
  addToHistoryLoading,
  isDeleting,
  onDelete,
  isPublication,
  onPublish,
}) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <TrackItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Box style={{ position: 'relative', display: 'inline-block', width: '35px', height: '35px' }}>
        {hover && user && track.isPublished ? (
          <IconButton
            onClick={onClick}
            disabled={addToHistoryLoading}
            sx={{
              position: 'absolute',
              top: 0,
              left: -13,
              width: '35px',
              height: '35px',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <PlayArrowIcon />
          </IconButton>
        ) : (
          <Typography sx={{ width: '35px', height: '35px', lineHeight: '35px' }}>{track.number}</Typography>
        )}
      </Box>
      <Typography>{track.title}</Typography>
      {!track.isPublished && user?.role !== 'admin' && (
        <Typography variant="body2" color="textSecondary" ml={5}>
          Unpublished
        </Typography>
      )}
      {user?.role === 'admin' && (
        <Grid2 container spacing={2} ml="auto">
          {!track.isPublished && (
            <Grid2>
              <LoadingButton
                loading={isPublication}
                color="info"
                variant="contained"
                onClick={onPublish}
                sx={{ width: '100%', height: '25px' }}
              >
                Publish
              </LoadingButton>
            </Grid2>
          )}
          <Grid2 ml="auto">
            <LoadingButton
              loading={isDeleting}
              color="error"
              variant="contained"
              onClick={onDelete}
              sx={{ width: '100%', height: '25px' }}
            >
              Delete
            </LoadingButton>
          </Grid2>
        </Grid2>
      )}
      <Box ml="auto" sx={{ width: '40px' }}>
        <Typography mr="auto" color="text.secondary">
          {track.duration}
        </Typography>
      </Box>
    </TrackItem>
  );
};

export default AlbumTrackItem;
