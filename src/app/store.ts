import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from '../services/github';
import trackedReposReducer from '../features/trackedRepos/trackedReposSlice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    trackedRepos: trackedReposReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;