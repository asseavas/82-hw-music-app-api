import { createSlice } from '@reduxjs/toolkit';
import { ApiTrackHistory, HistoryTrack } from '../../types';
import { fetchTrackHistory, addToHistory } from './tracksThunks';

interface TrackState {
  historyTrack: ApiTrackHistory | null;
  historyTracks: HistoryTrack[];
  historyTracksLoading: boolean;
}

const initialState: TrackState = {
  historyTrack: null,
  historyTracks: [],
  historyTracksLoading: false,
};

export const tracksSlice = createSlice({
  name: 'historyTracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToHistory.pending, (state) => {
        state.historyTracksLoading = true;
      })
      .addCase(addToHistory.fulfilled, (state, { payload: historyTrack }) => {
        state.historyTracksLoading = false;
        state.historyTrack = historyTrack;
      })
      .addCase(addToHistory.rejected, (state) => {
        state.historyTracksLoading = false;
      })
      .addCase(fetchTrackHistory.pending, (state) => {
        state.historyTracksLoading = true;
      })
      .addCase(
        fetchTrackHistory.fulfilled,
        (state, { payload: historyTracks }) => {
          state.historyTracksLoading = false;
          state.historyTracks = historyTracks;
        },
      )
      .addCase(fetchTrackHistory.rejected, (state) => {
        state.historyTracksLoading = false;
      });
  },
  selectors: {
    selectHistoryTrack: (state) => state.historyTrack,
    selectHistoryTracks: (state) => state.historyTracks,
    selectHistoryTracksLoading: (state) => state.historyTracksLoading,
  },
});

export const historyTracksReducer = tracksSlice.reducer;

export const {
  selectHistoryTrack,
  selectHistoryTracks,
  selectHistoryTracksLoading,
} = tracksSlice.selectors;
