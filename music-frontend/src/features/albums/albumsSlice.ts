import { createSlice } from '@reduxjs/toolkit';
import { Album, AlbumInfo } from '../../types';
import { fetchAlbums, fetchOneAlbum } from './albumsThunks';

export interface AlbumsState {
  items: Album[];
  album: AlbumInfo | null;
  itemsFetching: boolean;
  tracksFetching: boolean;
  oneFetching: boolean;
}

const initialState: AlbumsState = {
  items: [],
  album: null,
  itemsFetching: false,
  tracksFetching: false,
  oneFetching: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.itemsFetching = false;
        state.items = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(fetchOneAlbum.pending, (state) => {
        state.album = null;
        state.oneFetching = true;
      })
      .addCase(fetchOneAlbum.fulfilled, (state, { payload: album }) => {
        state.album = album;
        state.oneFetching = false;
      })
      .addCase(fetchOneAlbum.rejected, (state) => {
        state.oneFetching = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.items,
    selectAlbumsFetching: (state) => state.itemsFetching,
    selectOneAlbum: (state) => state.album,
    selectOneAlbumFetching: (state) => state.oneFetching,
    selectTracksFetching: (state) => state.tracksFetching,
  },
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectAlbumsFetching,
  selectOneAlbum,
  selectOneAlbumFetching,
  selectTracksFetching,
} = albumsSlice.selectors;
