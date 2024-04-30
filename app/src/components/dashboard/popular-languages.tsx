import { ChartProps } from "@/types/ChartProps";
import { Card, CardHeader, Divider, CardContent, List, ListItem, ListItemText } from "@mui/material";

export default function PopularLanguages({ data, sx }: ChartProps) {
    const languageCounts: Record<string, number> = {};

    // Iterate through each entry in the data and count occurrences of each language
    data.forEach(entry => {
        entry?.breakdown?.forEach(item => {
            const { language } = item;

            if (language === undefined) return;

            languageCounts[language] = (languageCounts[language] || 0) + 1;
        });
    });

    // Convert language counts to an array of objects [{ language: string, count: number }]
    const languageCountsArray = Object.entries(languageCounts).map(([language, count]) => ({ language, count }));

    // Sort languages by count in descending order
    languageCountsArray.sort((a, b) => b.count - a.count);

    // Extract sorted list of languages by popularity
    const popularLanguages: string[] = languageCountsArray.map(entry => entry.language);

    return (
        <Card sx={sx} variant="outlined">
            <CardHeader
                title="Popular Languages"
            />
            <Divider />
            <CardContent>
                <List>
                    {popularLanguages.map((language, index) => (
                        <ListItem divider={index < popularLanguages.length - 1} key={language}>
                            <ListItemText primary={language} secondary={`Used ${languageCounts[language]} times`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}