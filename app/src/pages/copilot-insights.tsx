import { useApi } from '../hooks/use-api';
import { CopilotUsageData } from '@/types';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CopilotInsightsProps {
  data: CopilotUsageData[];
}

const CopilotInsightsCharts: React.FC<CopilotInsightsProps> = ({ data }) => {
  // Extracting data for charts
  const totalSuggestionsData = data.map(entry => ({ day: entry.day, totalSuggestions: entry.total_suggestions_count }));
  const totalAcceptancesData = data.map(entry => ({ day: entry.day, totalAcceptances: entry.total_acceptances_count }));
  const totalLinesData = data.map(entry => ({ day: entry.day, totalLines: entry.total_lines_suggested }));
  const totalActiveUsersData = data.map(entry => ({ day: entry.day, totalActiveUsers: entry.total_active_users }));

  const languageBreakdownData = data.flatMap(entry => entry.breakdown?.map(item => ({
    language: item.language,
    suggestions: item.suggestions_count,
    acceptances: item.acceptances_count,
    linesSuggested: item.lines_suggested,
    linesAccepted: item.lines_accepted,
    activeUsers: item.active_users
  })));

  const languageCounts = languageBreakdownData.reduce((acc, curr) => {
    acc[curr.language] = (acc[curr.language] || 0) + 1;
    return acc;
  }, {});

  const languages = Object.keys(languageCounts);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        GitHub Copilot Usage Insights
      </Typography>

      {/* Total Suggestions Line Chart */}
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={totalSuggestionsData}>
          <Line type="monotone" dataKey="totalSuggestions" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Total Acceptances Line Chart */}
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={totalAcceptancesData}>
          <Line type="monotone" dataKey="totalAcceptances" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      {/* Total Lines Suggested Line Chart */}
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={totalLinesData}>
          <Line type="monotone" dataKey="totalLines" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>

      {/* Total Active Users Line Chart */}
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={totalActiveUsersData}>
          <Line type="monotone" dataKey="totalActiveUsers" stroke="#ff5733" />
        </LineChart>
      </ResponsiveContainer>

      {/* Language Breakdown Pie Chart */}
      <ResponsiveContainer width="90%" height={400}>
        <PieChart>
          <Pie
            data={languageBreakdownData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="suggestions"
          >
            {languages.map((language, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function CopilotInsights() {
  const [org, setOrg] = useState('appdevgbb');
  const [data, setData] = useState<CopilotUsageData[]>([]);
  const { fetchOrgUsageData } = useApi();

  useEffect(() => {
    function fetchData() {
      fetchOrgUsageData(org)
        .then(data => setData(prevData => [...prevData, ...data]))
        .catch(console.error);
    }

    fetchData();

  }, [org]);

  return (
    <CopilotInsightsCharts data={data} />
  )
}
