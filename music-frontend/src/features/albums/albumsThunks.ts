import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumInfo, AlbumMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAll',
  async (artistId) => {
    const { data: albums } = await axiosApi.get<Album[]>(
      `/albums?artist=${artistId}`,
    );
    return albums;
  },
);

export const fetchOneAlbum = createAsyncThunk<AlbumInfo, string>(
  'albums/fetchOne',
  async (id) => {
    const { data: album } = await axiosApi.get<AlbumInfo>(`/albums/${id}`);
    return album;
  },
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'albums/create',
  async (albumMutation) => {
    const formData = new FormData();

    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
    keys.forEach((key) => {
      const value = albumMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/albums', formData);
  },
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/delete',
  async (id) => {
    await axiosApi.delete(`/albums/${id}`);
  },
);

export const publishAlbum = createAsyncThunk<void, string>(
  'albums/publish',
  async (id) => {
    await axiosApi.patch(`/albums/${id}/togglePublished`);
  },
);
