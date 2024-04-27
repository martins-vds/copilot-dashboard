import { ChartProps } from "@/types";
import { Card, CardHeader, CardContent, Divider, List, ListItem, ListItemText } from "@mui/material";

export default function PopularEditors({ data, sx }: ChartProps) {
    const editorCounts: Record<string, number> = {};

    // Iterate through each entry in the data and count occurrences of each editor
    data.forEach(entry => {
        entry.breakdown?.forEach(item => {
            const { editor } = item;
            editorCounts[editor] = (editorCounts[editor] || 0) + 1;
        });
    });

    // Convert editor counts to an array of objects [{ editor: string, count: number }]
    const editorCountsArray = Object.entries(editorCounts).map(([editor, count]) => ({ editor, count }));

    // Sort editors by count in descending order
    editorCountsArray.sort((a, b) => b.count - a.count);

    // Extract sorted list of editors by popularity
    const popularEditors: string[] = editorCountsArray.map(entry => entry.editor);

    return (
        <Card sx={sx} variant="outlined">
            <CardHeader
                title="Popular Editors"
            />
            <Divider />
            <CardContent>
                <List>
                    {popularEditors.map((editor, index) => (
                        <ListItem divider={index < popularEditors.length - 1} key={editor}>
                            <ListItemText primary={editor} secondary={`Used ${editorCounts[editor]} times`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}