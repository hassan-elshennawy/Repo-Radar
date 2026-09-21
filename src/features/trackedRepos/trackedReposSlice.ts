import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const loadTrackedRepos = (): string[] => {
  const saved = localStorage.getItem('trackedRepos');
  return saved ? JSON.parse(saved) : [];
};

interface TrackedReposState {
  repoNames: string[];
}

const initialState: TrackedReposState = {
  repoNames: loadTrackedRepos(),
};

const trackedReposSlice = createSlice({
  name: 'trackedRepos',
  initialState,
  reducers: {
    trackRepo: (state, action: PayloadAction<string>) => {
      if (!state.repoNames.includes(action.payload)) {
        state.repoNames.push(action.payload);
        localStorage.setItem('trackedRepos', JSON.stringify(state.repoNames));
      }
    },
    untrackRepo: (state, action: PayloadAction<string>) => {
      state.repoNames = state.repoNames.filter(name => name !== action.payload);
      localStorage.setItem('trackedRepos', JSON.stringify(state.repoNames));
    },
  },
});

export const { trackRepo, untrackRepo } = trackedReposSlice.actions;
export default trackedReposSlice.reducer;