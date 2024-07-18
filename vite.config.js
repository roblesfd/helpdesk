import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
    ],
  });
};
