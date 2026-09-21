import { Card, CardHeader, Avatar, CardContent, Typography, Button, Box, Skeleton, Chip, CardActions, IconButton, Tooltip, Link } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import BugReportIcon from '@mui/icons-material/BugReport';
import EventIcon from '@mui/icons-material/Event';
import { useGetRepoDetailsQuery } from '../services/github';
import { useAppDispatch } from '../app/hooks';
import { untrackRepo } from '../features/trackedRepos/trackedReposSlice';

interface RepoCardProps {
  fullName: string;
}

export const RepoCard = ({ fullName }: RepoCardProps) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isError, refetch } = useGetRepoDetailsQuery(fullName);

  if (isLoading) {
    return (
      <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="60%" height={30} />
        </Box>
        <Skeleton variant="rectangular" height={32} sx={{ mb: 1, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={32} sx={{ mb: 1, borderRadius: 1 }} />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card sx={{ p: 3, height: '100%', border: '1px solid #ff1744' }}>
        <Typography color="error">Failed to load {fullName}</Typography>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        opacity: isFetching ? 0.7 : 1, 
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardHeader
        avatar={<Avatar src={data.owner.avatar_url} alt={data.owner.login} />}
        title={
          <Link href={data.html_url} target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {data.name}
            </Typography>
          </Link>
        }
        subheader={<Typography variant="body2" color="text.secondary">{data.owner.login}</Typography>}
        action={
          <Tooltip title="Refresh">
            <IconButton onClick={refetch} disabled={isFetching} size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Chip 
            icon={<StarIcon sx={{ color: '#faaf00 !important' }} />} 
            label={`${data.stargazers_count.toLocaleString()} Stars`} 
            variant="outlined" 
            sx={{ justifyContent: 'flex-start' }}
          />
          <Chip 
            icon={<BugReportIcon color="error" />} 
            label={`${data.open_issues_count.toLocaleString()} Open Issues`} 
            variant="outlined" 
            sx={{ justifyContent: 'flex-start' }}
          />
          <Chip 
            icon={<EventIcon color="action" />} 
            label={`Updated ${new Date(data.pushed_at).toLocaleDateString()}`} 
            variant="outlined" 
            sx={{ justifyContent: 'flex-start' }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button 
          fullWidth
          variant="outlined" 
          color="error" 
          startIcon={<DeleteIcon />} 
          onClick={() => dispatch(untrackRepo(fullName))}
        >
          Untrack
        </Button>
      </CardActions>
    </Card>
  );
};