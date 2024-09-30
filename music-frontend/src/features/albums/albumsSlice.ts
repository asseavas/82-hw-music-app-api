import { createSlice } from '@reduxjs/toolkit';
import { Album, AlbumInfo } from '../../types';
import {
  createAlbum,
  deleteAlbum,
  fetchAlbums,
  fetchOneAlbum,
  publishAlbum,
} from './albumsThunks';

export interface AlbumsState {
  items: Album[];
  album: AlbumInfo | null;
  itemsFetching: boolean;
  oneFetching: boolean;
  isCreating: boolean;
  deletingAlbumId: string | null;
  isDeleting: boolean;
  publishAlbumId: string | null;
  isPublication: boolean;
}

const initialState: AlbumsState = {
  items: [],
  album: null,
  itemsFetching: false,
  oneFetching: false,
  isCreating: false,
  deletingAlbumId: null,
  isDeleting: false,
  publishAlbumId: null,
  isPublication: false,
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

    builder
      .addCase(createAlbum.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(deleteAlbum.pending, (state, action) => {
        state.deletingAlbumId = action.meta.arg;
        state.isDeleting = true;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deletingAlbumId = null;
        state.isDeleting = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.isDeleting = false;
      });

    builder
      .addCase(publishAlbum.pending, (state, action) => {
        state.publishAlbumId = action.meta.arg;
        state.isPublication = true;
      })
      .addCase(publishAlbum.fulfilled, (state) => {
        state.publishAlbumId = null;
        state.isPublication = false;
      })
      .addCase(publishAlbum.rejected, (state) => {
        state.isPublication = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.items,
    selectAlbumsFetching: (state) => state.itemsFetching,
    selectOneAlbum: (state) => state.album,
    selectOneAlbumFetching: (state) => state.oneFetching,
    selectAlbumCreating: (state) => state.isCreating,
    selectAlbumDeleting: (state) => state.isDeleting,
    selectAlbumPublication: (state) => state.isPublication,
  },
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectAlbumsFetching,
  selectOneAlbum,
  selectOneAlbumFetching,
  selectAlbumCreating,
  selectAlbumDeleting,
  selectAlbumPublication,
} = albumsSlice.selectors;
