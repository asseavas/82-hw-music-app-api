import { createSlice } from '@reduxjs/toolkit';
import { HistoryTrack } from '../../types';
import { addToHistory, fetchTrackHistory } from './tracksHistoryThunks';

interface TrackState {
  items: HistoryTrack[];
  historyTracksLoading: boolean;
  historyTrackCreating: boolean;
}

const initialState: TrackState = {
  items: [],
  historyTracksLoading: false,
  historyTrackCreating: false,
};

export const tracksHistorySlice = createSlice({
  name: 'historyTracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToHistory.pending, (state) => {
        state.historyTrackCreating = true;
      })
      .addCase(addToHistory.fulfilled, (state) => {
        state.historyTrackCreating = false;
      })
      .addCase(addToHistory.rejected, (state) => {
        state.historyTrackCreating = false;
      });

    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.historyTracksLoading = true;
      })
      .addCase(
        fetchTrackHistory.fulfilled,
        (state, { payload: historyTracks }) => {
          state.historyTracksLoading = false;
          state.items = historyTracks;
        },
      )
      .addCase(fetchTrackHistory.rejected, (state) => {
        state.historyTracksLoading = false;
      });
  },
  selectors: {
    selectHistoryTracks: (state) => state.items,
    selectHistoryTracksLoading: (state) => state.historyTracksLoading,
    selectHistoryTracksCreating: (state) => state.historyTrackCreating,
  },
});

export const historyTracksReducer = tracksHistorySlice.reducer;

export const {
  selectHistoryTracks,
  selectHistoryTracksLoading,
  selectHistoryTracksCreating,
} = tracksHistorySlice.selectors;
