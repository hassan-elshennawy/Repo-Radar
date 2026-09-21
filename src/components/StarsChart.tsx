import { Paper, Typography, Box, useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface ChartData {
  name: string;
  stars: number;
}

interface StarsChartProps {
  data: ChartData[];
}

export const StarsChart = ({ data }: StarsChartProps) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mb: 3, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Stars per Tracked Repository
      </Typography>
      <Box sx={{ width: '100%', height: '90%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="name" 
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis 
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <Tooltip 
              cursor={{ fill: theme.palette.action.hover }}
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: '8px',
                borderColor: theme.palette.divider
              }}
            />
            <Bar 
              dataKey="stars" 
              fill={theme.palette.primary.main} 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};