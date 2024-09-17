import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const { data: artists } = await axiosApi.get<Artist[]>('/artists');
    return artists;
  },
);

export const fetchOneArtist = createAsyncThunk<Artist, string>(
  'artists/fetchOne',
  async (id) => {
    const { data: artist } = await axiosApi.get<Artist>(`/artists/${id}`);
    return artist;
  },
);
