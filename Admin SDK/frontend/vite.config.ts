import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fcmSwEnvPlugin } from "./config/vitePlugins";

export default defineConfig(({ command }) => {
    if (command === "serve") {
        return {
            plugins: [fcmSwEnvPlugin()],
        };
    } else {
        // command === 'build'
        return {
            plugins: [tsconfigPaths()],
            build: {
                target: "es2022",
                rollupOptions: {
                    input: {
                        "main": "./index.html",
                        "firebase-messaging-sw": "./src/firebase-messaging-sw.js",
                    },
                    output: {
                        entryFileNames: (chunkInfo) => {
                            return chunkInfo.name === "firebase-messaging-sw"
                                ? "[name].js" // Output service worker in root
                                : "assets/[name]-[hash].js"; // Others in `assets/`
                        },
                    },
                },
            },
        };
    }
});