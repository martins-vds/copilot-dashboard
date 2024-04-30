import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Layout from './components/layout.tsx';
import { CssBaseline } from '@mui/material';
import CopilotInsights from './pages/copilot-insights.tsx';
import { GitHubAuthProvider } from './store/reducer/github-auth-provider.tsx';
import GitHubCallback from './pages/github-callback.tsx';
import Landing from './pages/landing.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "copilot-insights", element: <CopilotInsights /> }
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <GitHubAuthProvider>
      <RouterProvider router={router} />
    </GitHubAuthProvider>
  </React.StrictMode>
)
