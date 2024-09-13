import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, ArtistInfo } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const { data: artists } = await axiosApi.get<Artist[]>('/artists');
    return artists;
  },
);

export const fetchOneArtist = createAsyncThunk<ArtistInfo, string>(
  'artists/fetchOne',
  async (id) => {
    const { data: artist } = await axiosApi.get<ArtistInfo>(`/artists/${id}`);
    return artist;
  },
);
