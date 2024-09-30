import { createSlice } from '@reduxjs/toolkit';
import { createTrack, deleteTrack, publishTrack } from './tracksThunks';

export interface TracksState {
  isCreating: boolean;
  deletingTrackId: string | null;
  isDeleting: boolean;
  publishTrackId: string | null;
  isPublication: boolean;
}

const initialState: TracksState = {
  isCreating: false,
  deletingTrackId: null,
  isDeleting: false,
  publishTrackId: null,
  isPublication: false,
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

    builder
      .addCase(publishTrack.pending, (state, action) => {
        state.publishTrackId = action.meta.arg;
        state.isPublication = true;
      })
      .addCase(publishTrack.fulfilled, (state) => {
        state.publishTrackId = null;
        state.isPublication = false;
      })
      .addCase(publishTrack.rejected, (state) => {
        state.isPublication = false;
      });
  },
  selectors: {
    selectTrackCreating: (state) => state.isCreating,
    selectTrackDeleting: (state) => state.isDeleting,
    selectTrackPublication: (state) => state.isPublication,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTrackCreating,
  selectTrackDeleting,
  selectTrackPublication,
} = tracksSlice.selectors;
