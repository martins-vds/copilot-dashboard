import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useApi } from '../hooks/use-api';
import { CopilotUsageData } from "@/types/CopilotUsageData";
import { Team } from '@/types/Team';
import { Notification } from '@/types/Notification';
import AsyncAutocomplete from '../components/async-autocomplete';
import ToastNotification from '../components/notification';
import TotalAcceptances from '../components/dashboard/total-acceptances';
import TotalActiveUsers from '../components/dashboard/total-active-users';
import TotalAcceptancesByLanguages from '../components/dashboard/total-acceptances-by-language';
import PopularEditors from '../components/dashboard/popular-editors';
import PopularLanguages from '../components/dashboard/popular-languages';
import { usage_types } from '../types/usage-types';
import { Telemetry } from '../components/telemetry';

function RenderDashboard() {
  const { fetchEnterprises, fetchEnterpriseUsageData, fetchOrgUsageData, fetchOrgs, fetchTeams, fetchTeamUsageData } = useApi();

  const [selectedUsage, setSelectedUsage] = useState<string>('Enterprises');
  const [enterprise, setEnterprise] = useState<string>('');
  const [org, setOrg] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [data, setData] = useState<CopilotUsageData[]>([]);
  const [notification, setNotification] = useState<Notification>({
    message: undefined,
    type: 'success'
  });

  useEffect(() => {
    async function fetchData() {
      if (!enterprise || selectedUsage !== 'Enterprises') return;

      try {
        const data = await fetchEnterpriseUsageData(enterprise)
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setNotification({
            message: `Failed to fetch usage data for enterprise '${enterprise}': ${error.message}`,
            type: 'error'
          });
        }
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterprise]);

  useEffect(() => {
    async function fetchData() {
      if (!org || selectedUsage !== 'Organizations') return;

      try {
        const data = await fetchOrgUsageData(org)
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setNotification({
            message: `Failed to fetch usage data for organization '${org}': ${error.message}`,
            type: 'error'
          });
        }
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org]);

  useEffect(() => {
    async function fetchData() {
      if (!org || !team) return;

      try {
        const data = await fetchTeamUsageData(org, team)
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setNotification({
            message: `Failed to fetch usage data for team '${team}': ${error.message}`,
            type: 'error'
          });
        }
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  return (
    <>
      <ToastNotification notification={notification} />
      <Stack spacing={1} gap={1} direction={'row'} sx={{
        marginBottom: 2,
      }}>
        <FormControl>
          <InputLabel id="usage-by-label">Usage By</InputLabel>
          <Select
            labelId="usage-by-label"
            value={selectedUsage}
            label="Usage By"
            onChange={(event) => setSelectedUsage(event.target.value)}
          >
            {usage_types.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedUsage === 'Enterprises' && (<AsyncAutocomplete
          label="Enterprises"
          loadOptions={fetchEnterprises}
          getOptionLabel={(option) => option as string}
          onChange={(_, value) => setEnterprise(value as string)}
          isOptionEqualToValue={(option, value) => option === value}
          onError={(error) => setNotification({
            message: `Failed to fetch enterprises: ${(error as Error).message}`,
            type: 'error'
          })}
        />)}
        {selectedUsage !== 'Enterprises' && (<AsyncAutocomplete
          label="Organizations"
          loadOptions={fetchOrgs}
          getOptionLabel={(option) => option as string}
          onChange={(_, value) => setOrg(value as string)}
          isOptionEqualToValue={(option, value) => option === value}
          onError={(error) => setNotification({
            message: `Failed to fetch organizations: ${(error as Error).message}`,
            type: 'error'
          })}
        />)}
        {selectedUsage === 'Teams' && (
          <AsyncAutocomplete
            label="Teams"
            loadOptions={() => fetchTeams(org)}
            getOptionLabel={(option) => (option as Team).name as string}
            onChange={(_, value) => setTeam((value as Team).slug as string)}
            isOptionEqualToValue={(option, value) => option === value}
            onError={(error) => setNotification({
              message: `Failed to fetch teams: ${(error as Error).message}`,
              type: 'error'
            })}
          />
        )}
      </Stack>
      <Grid container spacing={3} sx={{
        marginBottom: 2      
      }}>
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
          <PopularEditors data={data}/>
        </Grid>

        <Grid lg={3} sm={6} xs={12}>
          <PopularLanguages data={data}/>
        </Grid>

      </Grid>
    </>
  )
}

export default function Dashboard() {
    return (
      <Telemetry component={RenderDashboard} />
    );
}
