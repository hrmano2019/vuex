import { defineConfig } from 'astro/config';
import auth from "auth-astro";
export default defineConfig({
  integrations: [
    auth({
      configFile: './auth.config.mts'  // Explicitly specify the .mts extension
    })
  ],
});
