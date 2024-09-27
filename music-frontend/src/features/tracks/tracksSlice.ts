import { createSlice } from '@reduxjs/toolkit';
import { createTrack, deleteTrack } from './tracksThunks';

export interface TracksState {
  isCreating: boolean;
  deletingTrackId: string | null;
  isDeleting: boolean;
}

const initialState: TracksState = {
  isCreating: false,
  deletingTrackId: null,
  isDeleting: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrack.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(deleteTrack.pending, (state, action) => {
        state.deletingTrackId = action.meta.arg;
        state.isDeleting = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.deletingTrackId = null;
        state.isDeleting = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectTrackCreating: (state) => state.isCreating,
    selectTrackDeleting: (state) => state.isDeleting,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const { selectTrackCreating, selectTrackDeleting } =
  tracksSlice.selectors;
