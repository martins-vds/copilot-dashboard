import { ChartProps } from "@/types/ChartProps";
import { Card, CardHeader, CardContent, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";

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
        <Card sx={{
            ...sx,
            minHeight: 300,
            maxHeight: 300
        }} variant="outlined">
            <CardHeader
                title="Popular Editors"
            />
            <Divider />
            <CardContent>
                <List sx={{
                    maxHeight: 200,
                    overflowY: 'auto'                
                }}>
                    {popularEditors.map((editor, index) => (
                        <ListItem divider={index < popularEditors.length - 1} key={editor}>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText'                                
                                }}>
                                    {index + 1}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={editor} secondary={`Used ${editorCounts[editor]} times`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}