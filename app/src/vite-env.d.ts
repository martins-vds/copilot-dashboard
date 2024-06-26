/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GITHUB_CLIENT_ID: string,
    readonly VITE_GITHUB_PROXY_URL: string,
    readonly VITE_GITHUB_CALLBACK_URL: string,
    readonly VITE_APP_INSIGHTS_INSTRUMENTATION_KEY: string,
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }