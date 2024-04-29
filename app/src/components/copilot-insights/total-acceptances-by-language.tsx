import { ChartProps } from "@/types/ChartProps";
import { Card, CardHeader, Divider, CardContent } from "@mui/material";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip } from "recharts";

export default function TotalAcceptancesByLanguages({ data, sx }: ChartProps) {
    const acceptanceByLanguage: Record<string, {
        language: string;
        acceptances_count: number;
        suggestions_count: number;
    }> = {};

    // Iterate through each entry in the data and accumulate acceptance count for each language
    data.forEach(entry => {
        entry?.breakdown?.forEach(item => {
            const { language, acceptances_count, suggestions_count } = item;

            if (language === undefined) return;

            acceptanceByLanguage[language] = {
                language,
                acceptances_count: (acceptanceByLanguage[language]?.acceptances_count || 0) + (acceptances_count || 0),
                suggestions_count: (acceptanceByLanguage[language]?.suggestions_count || 0) + (suggestions_count || 0)
            };
        });
    });

    // Convert language counts to an array of objects [{ language: string, count: number }]
    const acceptanceByLanguageArray = Object.values(acceptanceByLanguage);

    return (
        <Card sx={sx} variant="outlined">
            <CardHeader
                title="Total Acceptances By Language"
            />
            <Divider />
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={acceptanceByLanguageArray}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 30,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="language" angle={45} reversed tickMargin={10} tick={{
                            textAnchor: 'start',
                        }}/>
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top" />
                        <Bar dataKey="suggestions_count" fill="#82ca9d" />
                        <Bar dataKey="acceptances_count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}