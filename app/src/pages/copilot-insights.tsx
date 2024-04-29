import TotalAcceptances from '../components/copilot-insights/total-acceptances';
import { useApi } from '../hooks/use-api';
import { CopilotUsageData } from '@/types';
import { useEffect, useState } from 'react';
import TotalActiveUsers from '../components/copilot-insights/total-active-users';
import Grid from '@mui/material/Unstable_Grid2';
import PopularEditors from '../components/copilot-insights/popular-editors';
import PopularLanguages from '../components/copilot-insights/popular-languages';
import TotalAcceptancesByLanguages from '../components/copilot-insights/total-acceptances-by-language';
import { Stack } from '@mui/material';
import AsyncAutocomplete from '../components/async-autocomplete';

export default function CopilotInsights() {
  const [enterprise, setEnterprise] = useState<string>('');
  const [org, setOrg] = useState<string>('');

  const [data, setData] = useState<CopilotUsageData[]>([]);
  const { fetchOrgUsageData, fetchOrgs, fetchEnterprises, fetchEnterpriseUsageData } = useApi();

  useEffect(() => {
    function fetchData() {
      if(!org) return;

      fetchOrgUsageData(org)
        .then(data => setData(data))
        .catch(console.error);
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org]);

  useEffect(() => {
    function fetchData() {
      if(!enterprise) return;

      fetchEnterpriseUsageData(enterprise)
        .then(data => setData(data))
        .catch(console.error);
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterprise]);

  return (
    <>
      <Stack spacing={3} gap={2} direction={'row'} sx={{
        marginBottom: 3    
      }}>
        <AsyncAutocomplete
          label="Enterprises"
          loadOptions={fetchEnterprises}
          getOptionLabel={(option) => option as string}
          onChange={(event, value) => setEnterprise(value as string)}
          isOptionEqualToValue={(option, value) => option === value}
        />
        <AsyncAutocomplete
          label="Organizations"
          loadOptions={fetchOrgs}
          getOptionLabel={(option) => option as string}
          onChange={(event, value) => setOrg(value as string)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Stack>
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
    </>
  )
}
