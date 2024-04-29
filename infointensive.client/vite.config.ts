import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import pluginMkcert from "vite-plugin-mkcert";
import { env } from "process";
import { fileURLToPath } from 'url';

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7227';

export default defineConfig({
    plugins: [pluginReact(), pluginMkcert()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: "https://localhost:7227",
                secure: false,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})


