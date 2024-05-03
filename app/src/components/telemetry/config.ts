import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

export const reactPlugin = new ReactPlugin();
export const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: import.meta.env.VITE_APP_INSIGHTS_INSTRUMENTATION_KEY,
        enableAutoRouteTracking: true,
        extensions: [reactPlugin]
    }
});

export function configureTelemetry() {
    appInsights.loadAppInsights();
}