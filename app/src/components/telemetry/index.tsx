import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from './config';

export function Telemetry({ component }: { component: React.ComponentType; }) {
    const Component = withAITracking(reactPlugin, component);
    return <Component />;
}
