import { useAppSelector, useAppDispatch } from '../app/hooks';
import { githubApi } from '../services/github';
import { StarsChart, type ChartData } from './StarsChart';
import { RepoCard } from './RepoCard';
import { Box, Button, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export const TrackedReposDashboard = () => {
  const dispatch = useAppDispatch();
  const trackedRepoNames = useAppSelector((state) => state.trackedRepos.repoNames);

  const chartData: ChartData[] = useAppSelector((state) => {
    return trackedRepoNames.map((fullName) => {
      const queryResult = githubApi.endpoints.getRepoDetails.select(fullName)(state);
      
      return {
        name: fullName.split('/')[1] || fullName,
        stars: queryResult?.data?.stargazers_count || 0,
      };
    });
  });

  const handleRefreshAll = () => {
    dispatch(githubApi.util.invalidateTags(['Repo']));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Tracked Repositories</Typography>
        {trackedRepoNames.length > 0 && (
          <Button 
            variant="contained" 
            startIcon={<RefreshIcon />} 
            onClick={handleRefreshAll}
          >
            Refresh All
          </Button>
        )}
      </Box>

      {trackedRepoNames.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          You aren't tracking any repositories yet. Search above to get started.
        </Typography>
      ) : (
        <>
          <StarsChart data={chartData} />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
            {trackedRepoNames.map((fullName) => (
              <RepoCard key={fullName} fullName={fullName} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};