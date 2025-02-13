import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

// Determine the host dynamically based on the platform

// @ts-ignore
const tauriPlatform = process.env.TAURI_PLATFORM;

// @ts-expect-error process is a nodejs global
const host = tauriPlatform === "android" || tauriPlatform === "ios" ? "0.0.0.0" : process.env.TAURI_DEV_HOST || false;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [sveltekit(), tailwindcss()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  clearScreen: false,

  server: {
    host,
    port: 1420,
    strictPort: true,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1430,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));
