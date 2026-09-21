import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText, Button, CircularProgress, Paper, InputAdornment, Link, ListItemAvatar, Avatar, IconButton, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useLazySearchReposQuery } from '../services/github';
import { useDebounce } from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { trackRepo, untrackRepo } from '../features/trackedRepos/trackedReposSlice';
import GitHubIcon from '@mui/icons-material/GitHub';

export const RepoSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, { data, isFetching, isError }] = useLazySearchReposQuery();
  const dispatch = useAppDispatch();
  const trackedRepos = useAppSelector(state => state.trackedRepos.repoNames);

  const debouncedSearch = useDebounce((query: string) => {
    if (query.trim()) triggerSearch(query);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <TextField
        fullWidth
        label="Search GitHub Repositories"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        slotProps={{
            input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {isFetching ? (
                      <CircularProgress size={20} />
                    ) : searchTerm ? (
                      <IconButton onClick={() => setSearchTerm('')} edge="end" size="small">
                        <ClearIcon />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                ),
              },
        }}
      />
      
      {searchTerm.trim() !== '' && data?.items && data.items.length > 0 && (
        <List sx={{ maxHeight: 300, overflow: 'auto', mt: 1 }}>
          {data.items.map((repo) => {
            const isTracked = trackedRepos.includes(repo.full_name);
            return (
              <ListItem 
                key={repo.id}
                sx={{ 
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 0 } 
                }}
                secondaryAction={
                  <Button 
                    variant={isTracked ? "outlined" : "contained"}
                    color={isTracked ? "error" : "primary"}
                    onClick={() => dispatch(isTracked ? untrackRepo(repo.full_name) : trackRepo(repo.full_name))}
                  >
                    {isTracked ? 'Untrack' : 'Track'}
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar src={repo.owner.avatar_url} alt={repo.owner.login}>
                    <GitHubIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" color="inherit" underline="hover" sx={{ fontWeight: 'bold' }}>
                      {repo.full_name}
                    </Link>
                  } 
                  secondary={`⭐ ${repo.stargazers_count.toLocaleString()}`} 
                />
              </ListItem>
            );
          })}
        </List>
      )}

      {searchTerm.trim() !== '' && !isFetching && data?.items && data.items.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          No repositories found.
        </Typography>
      )}

      {isError && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          GitHub API limit reached or network error. Please try again later.
        </Typography>
      )}
    </Paper>
  );
};