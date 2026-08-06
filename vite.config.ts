import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/nvidia': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/nvidia/, '/v1'),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              if (env.NVIDIA_API_KEY) {
                proxyReq.setHeader('Authorization', `Bearer ${env.NVIDIA_API_KEY}`);
              }
            });
            proxy.on('error', (err, req, res) => {
              console.error('Proxy Error:', err);
            });
          }
        }
      }
    }
  }
})
