import TotalAcceptances from '../components/copilot-insights/total-acceptances';
import { useApi } from '../hooks/use-api';
import { CopilotUsageData } from '@/types';
import { useEffect, useState } from 'react';
import TotalActiveUsers from '../components/copilot-insights/total-active-users';
import Grid from '@mui/material/Unstable_Grid2';
import PopularEditors from '../components/copilot-insights/popular-editors';
import PopularLanguages from '../components/copilot-insights/popular-languages';
import TotalAcceptancesByLanguages from '../components/copilot-insights/total-acceptances-by-language';

const org = 'appdevgbb';

export default function CopilotInsights() {
  const [data, setData] = useState<CopilotUsageData[]>([]);
  const { fetchOrgUsageData } = useApi();

  useEffect(() => {
    function fetchData() {
      fetchOrgUsageData(org)
        .then(data => setData(data))
        .catch(console.error);
    }

    fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org]);

  return (
    <Grid container spacing={3}>
      <Grid lg={6} sm={6} xs={12}>
        {/* Total Acceptances Line Chart */}
        <TotalAcceptances data={data} />
      </Grid>

      <Grid lg={6} sm={6} xs={12}>
        {/* Total Acceptances Line Chart */}
        <TotalActiveUsers data={data} />
      </Grid>

      <Grid xs={12}>
        <TotalAcceptancesByLanguages data={data} />
      </Grid>

      <Grid lg={3} sm={6} xs={12}>
        {/* Total Suggestions Line Chart */}
        <PopularEditors data={data} />
      </Grid>

      <Grid lg={3} sm={6} xs={12}>
        <PopularLanguages data={data} />
      </Grid>


    </Grid>
  )
}
