import type { ImportMetaEnv } from "./env.d";

console.log('export from jest')

export const env: ImportMetaEnv = {
  VITE_API_URL: process.env.VITE_API_URL,
  VITE_APP_DESCRIPTION: process.env.VITE_APP_DESCRIPTION,
  VITE_APP_NAME: process.env.VITE_APP_NAME,
  VITE_APP_URL: process.env.VITE_APP_URL,
};