import { defineConfig , loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    plugins: [react()],
    base:process.env.VITE_BASE,
    server: {
      fs: {
        allow: ["D:/projects/nodejs/gra-utils","D:/projects/nodejs/react/react-ionic-pide"]
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    }
  })
}