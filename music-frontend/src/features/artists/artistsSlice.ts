import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import { fetchArtists, fetchOneArtist } from './artistsThunks';

export interface ArtistsState {
  items: Artist[];
  artist: Artist | null;
  itemsFetching: boolean;
  oneFetching: boolean;
}

const initialState: ArtistsState = {
  items: [],
  artist: null,
  itemsFetching: false,
  oneFetching: false,
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
  },
  selectors: {
    selectArtists: (state) => state.items,
    selectArtistsFetching: (state) => state.itemsFetching,
    selectOneArtist: (state) => state.artist,
    selectOneArtistFetching: (state) => state.oneFetching,
  },
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectArtistsFetching,
  selectOneArtist,
  selectOneArtistFetching,
} = artistsSlice.selectors;
