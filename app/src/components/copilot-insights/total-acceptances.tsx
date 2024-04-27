import { ChartProps } from "@/types";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export default function TotalAcceptances({ data, sx }: ChartProps) {
    const totalAcceptancesData = data.map(entry => ({ day: entry.day, totalAcceptances: entry.total_acceptances_count }));

    return (
        <Card sx={sx} variant="outlined">
            <CardHeader
                title="Total Acceptances"
            />
            <Divider />
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={totalAcceptancesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalActiveUsers" stroke="#ff5733" />
                        <XAxis dataKey="day" format={"mm/dd"} />
                        <YAxis />
                        <Line type="monotone" dataKey="totalAcceptances" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}