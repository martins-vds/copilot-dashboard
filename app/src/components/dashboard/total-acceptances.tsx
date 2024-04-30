import { ChartProps } from "@/types/ChartProps";
import { formatDate } from "../../utils/format-date";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from "recharts";

export default function TotalAcceptances({ data, sx }: ChartProps) {
    const totalAcceptancesData = data.map(entry => ({ day: entry.day, totalAcceptances: entry.total_acceptances_count, totalSuggestions: entry.total_suggestions_count }));

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
                        <XAxis dataKey="day" tickFormatter={formatDate} />
                        <YAxis />
                        <Legend />
                        <Line type="monotone" dataKey="totalSuggestions" stroke="#82ca9f" />
                        <Line type="monotone" dataKey="totalAcceptances" stroke="#8884d8" />                        
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}