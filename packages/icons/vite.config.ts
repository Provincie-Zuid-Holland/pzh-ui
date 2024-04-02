import typescriptPlugin from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { PluginOption, defineConfig } from "vite";

const isExternal = (id) => !id.startsWith(".") && !path.isAbsolute(id);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
      babel: {
        configFile: true,
      },
    }),
    visualizer(),
  ],
  build: {
    target: "esnext",
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: isExternal,
      plugins: [
        typescriptPlugin({
          exclude: ["**/*.test.tsx", "**/*.stories.tsx"],
        }) as PluginOption,
      ],
      output: {
        entryFileNames: "[name].js",
        preserveModules: true,
      },
    },
    lib: {
      entry: path.resolve(path.resolve(path.dirname("")), "src/index.ts"),
      formats: ["es"],
    },
  },
});
