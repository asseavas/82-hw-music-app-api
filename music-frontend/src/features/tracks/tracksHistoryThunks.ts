import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackHistoryMutation, HistoryTrack } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const addToHistory = createAsyncThunk<
  TrackHistoryMutation,
  TrackHistoryMutation,
  { state: RootState }
>('tracksHistory/create', async (trackHistoryMutation, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.post<TrackHistoryMutation>(
    '/track_history',
    trackHistoryMutation,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return trackHistoryMutation;
});

export const fetchTrackHistory = createAsyncThunk<
  HistoryTrack[],
  void,
  { state: RootState }
>('tracksHistory/fetch', async (_, { getState }) => {
  const token = getState().users.user?.token;

  if (!token) {
    throw new Error('No token found');
  }

  const { data: historyTrack } = await axiosApi.get<HistoryTrack[]>(
    '/track_history',
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return historyTrack;
});
