import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import {
  createArtist,
  deleteArtist,
  fetchArtists,
  fetchOneArtist,
  publishArtist,
} from './artistsThunks';

export interface ArtistsState {
  items: Artist[];
  artist: Artist | null;
  itemsFetching: boolean;
  oneFetching: boolean;
  isCreating: boolean;
  deletingArtistId: string | null;
  isDeleting: boolean;
  publishArtistId: string | null;
  isPublication: boolean;
}

const initialState: ArtistsState = {
  items: [],
  artist: null,
  itemsFetching: false,
  oneFetching: false,
  isCreating: false,
  deletingArtistId: null,
  isDeleting: false,
  publishArtistId: null,
  isPublication: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.itemsFetching = false;
        state.items = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(fetchOneArtist.pending, (state) => {
        state.artist = null;
        state.oneFetching = true;
      })
      .addCase(fetchOneArtist.fulfilled, (state, { payload: artist }) => {
        state.artist = artist;
        state.oneFetching = false;
      })
      .addCase(fetchOneArtist.rejected, (state) => {
        state.oneFetching = false;
      });

    builder
      .addCase(createArtist.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createArtist.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(deleteArtist.pending, (state, action) => {
        state.deletingArtistId = action.meta.arg;
        state.isDeleting = true;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.deletingArtistId = null;
        state.isDeleting = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.isDeleting = false;
      });

    builder
      .addCase(publishArtist.pending, (state, action) => {
        state.publishArtistId = action.meta.arg;
        state.isPublication = true;
      })
      .addCase(publishArtist.fulfilled, (state) => {
        state.publishArtistId = null;
        state.isPublication = false;
      })
      .addCase(publishArtist.rejected, (state) => {
        state.isPublication = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.items,
    selectArtistsFetching: (state) => state.itemsFetching,
    selectOneArtist: (state) => state.artist,
    selectOneArtistFetching: (state) => state.oneFetching,
    selectArtistCreating: (state) => state.isCreating,
    selectArtistDeleting: (state) => state.isDeleting,
    selectArtistPublication: (state) => state.isPublication,
  },
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectArtistsFetching,
  selectOneArtist,
  selectOneArtistFetching,
  selectArtistCreating,
  selectArtistDeleting,
  selectArtistPublication,
} = artistsSlice.selectors;
