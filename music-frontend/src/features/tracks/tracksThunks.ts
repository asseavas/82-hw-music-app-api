import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiTrackHistory, HistoryTrack } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const addToHistory = createAsyncThunk<
  ApiTrackHistory,
  ApiTrackHistory,
  { state: RootState }
>('tracksHistory/create', async (apiTrackHistory, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.post<ApiTrackHistory>('/track_history', apiTrackHistory, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return apiTrackHistory;
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
