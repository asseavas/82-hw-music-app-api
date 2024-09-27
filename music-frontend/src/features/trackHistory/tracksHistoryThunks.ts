import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackHistoryMutation, HistoryTrack } from '../../types';
import axiosApi from '../../axiosApi';

export const addToHistory = createAsyncThunk<void, TrackHistoryMutation>(
  'tracksHistory/create',
  async (trackHistoryMutation) => {
    await axiosApi.post<TrackHistoryMutation>(
      '/track_history',
      trackHistoryMutation,
    );
  },
);

export const fetchTrackHistory = createAsyncThunk<HistoryTrack[]>(
  'tracksHistory/fetch',
  async () => {
    const { data: historyTrack } =
      await axiosApi.get<HistoryTrack[]>('/track_history');
    return historyTrack;
  },
);
