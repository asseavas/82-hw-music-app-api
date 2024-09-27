import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/artists/artistsSlice';
import { albumsReducer } from '../features/albums/albumsSlice';
import { usersReducer } from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { historyTracksReducer } from '../features/trackHistory/tracksHistorySlice';
import { tracksReducer } from '../features/tracks/tracksSlice';

const userPersistConfig = {
  key: 'music:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  historyTracks: historyTracksReducer,
  tracks: tracksReducer,
  users: persistReducer(userPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
