import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, ArtistMutation } from '../../types';
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

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/create',
  async (artistMutation) => {
    const formData = new FormData();

    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
    keys.forEach((key) => {
      const value = artistMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData);
  },
);

export const deleteArtist = createAsyncThunk<void, string>(
  'products/delete',
  async (id) => {
    await axiosApi.delete(`/artists/${id}`);
  },
);

export const publishArtist = createAsyncThunk<void, string>(
  'products/publish',
  async (id) => {
    await axiosApi.patch(`/artists/${id}/togglePublished`);
  },
);
