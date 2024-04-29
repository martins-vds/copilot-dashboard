import { ChartProps } from "@/types/ChartProps";
import { formatDate } from "../../utils/format-date";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip } from "recharts";

export default function TotalActiveUsers({ data, sx }: ChartProps) {
    const totalActiveUsersData = data.map(entry => ({ day: entry.day, totalActiveUsers: entry.total_active_users }));

    return (
        <Card sx={sx} variant="outlined">
            <CardHeader
                title="Total Active Users"
            />
            <Divider />
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={totalActiveUsersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalActiveUsers" stroke="#ff5733" />
                        <XAxis dataKey="day" tickFormatter={formatDate} />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}