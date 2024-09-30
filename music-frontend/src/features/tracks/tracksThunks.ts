import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const createTrack = createAsyncThunk<void, TrackMutation>(
  'tracks/create',
  async (trackMutation) => {
    await axiosApi.post<TrackMutation>('/tracks', trackMutation);
  },
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/delete',
  async (id) => {
    await axiosApi.delete(`/tracks/${id}`);
  },
);

export const publishTrack = createAsyncThunk<void, string>(
  'tracks/publish',
  async (id) => {
    await axiosApi.patch(`/tracks/${id}/togglePublished`);
  },
);
