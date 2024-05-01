import { ChartProps } from "@/types/ChartProps";
import { Card, CardHeader, Divider, CardContent, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";

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
        <Card sx={{
            ...sx,
            minHeight: 300,
            maxHeight: 300
        }} variant="outlined">
            <CardHeader
                title="Popular Languages"
            />
            <Divider />
            <CardContent>
                <List sx={{
                    maxHeight: 200,
                    overflowY: 'auto'                
                }}>
                    {popularLanguages.map((language, index) => (
                        <ListItem divider={index < popularLanguages.length - 1} key={language}>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText'                                
                                }}>
                                    {index + 1}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={language} secondary={`Used ${languageCounts[language]} times`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}