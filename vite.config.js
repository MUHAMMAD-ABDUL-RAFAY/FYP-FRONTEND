// import react from '@vitejs/plugin-react'
// import path from "path"
// import { defineConfig } from "vite"

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })




import { defineConfig, loadEnv } from 'vite';
import path from "path"
import { viteStaticCopy } from 'vite-plugin-static-copy';
export default defineConfig({
  define:{
    'process.env': {}
  },
  plugins: [
    // ...other plugins
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/onnxruntime-web/dist/*.wasm',
          dest: '.'
        }
      ]
    }),
    {
      // Add CSS for Tailwind
      css: {
        preprocessorOptions: {
          tailwindcss: {},
        },
      },
    },
  ],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src"),
    },
  }
});