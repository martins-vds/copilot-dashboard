import { SxProps } from "@mui/material";
import { CopilotUsageData } from "./CopilotUsageData";


export interface ChartProps {
    data: CopilotUsageData[];
    sx?: SxProps;
}
