import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Layout from './components/layout.tsx';
import { CssBaseline } from '@mui/material';
import Dashboard from './pages/dashboard.tsx';
import { GitHubAuthProvider } from './store/reducer/github-auth-provider.tsx';
import GitHubCallback from './pages/github-callback.tsx';
import Landing from './pages/landing.tsx';
import AuthenticationGuard from './components/auth/authentication-guard.tsx';
import { configureTelemetry } from './components/telemetry/config.ts';
import { Telemetry } from './components/telemetry/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Telemetry component={Landing} /> },
      {
        path: "dashboard", element: <AuthenticationGuard component={Dashboard} />
      }
    ],
  },
  {
    path: "/github/callback",
    element: <Layout />,
    children: [
      { index: true, element: <GitHubCallback /> },
    ],
  }
]);

configureTelemetry();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <GitHubAuthProvider>
      <RouterProvider router={router} />
    </GitHubAuthProvider>
  </React.StrictMode>
)
