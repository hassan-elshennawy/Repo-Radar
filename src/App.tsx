import { useState, useMemo } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, ThemeProvider, createTheme, IconButton, Tooltip } from '@mui/material';
import { RepoSearch } from './components/RepoSearch';
import { TrackedReposDashboard } from './components/Dashboard';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import RadarIcon from '@mui/icons-material/Radar';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#6366f1',
          },
          secondary: {
            main: '#ec4899',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={0} sx={{ mb: 4, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper', color: 'text.primary' }}>
        <Toolbar>
          <RadarIcon sx={{ mr: 1.5, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Repo Radar
          </Typography>
          <Tooltip title={`Turn ${mode === 'light' ? 'off' : 'on'} the light`}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <RepoSearch />
          <TrackedReposDashboard />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App

