import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumInfo } from '../../types';
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
