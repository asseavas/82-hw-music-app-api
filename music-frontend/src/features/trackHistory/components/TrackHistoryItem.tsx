import React from 'react';
import { HistoryTrack } from '../../../types';
import { Typography } from '@mui/material';
import { TrackItem } from '../../../constants';
import dayjs from 'dayjs';

interface Props {
  track: HistoryTrack;
}

const TrackHistoryItem: React.FC<Props> = ({ track }) => {
  return (
    <TrackItem
      sx={{ height: '50px', border: '1px solid rgba(80, 80, 80, 0.7)' }}
    >
      <Typography sx={{ width: '350px' }}>{track.title.title}</Typography>
      <Typography>{track.artist.name}</Typography>
      <Typography ml="auto" color="text.secondary">
        {dayjs(track.datetime).format('DD.MM.YYYY HH:mm')}
      </Typography>
    </TrackItem>
  );
};

export default TrackHistoryItem;
