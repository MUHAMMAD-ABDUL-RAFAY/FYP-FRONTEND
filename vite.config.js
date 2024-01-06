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




import { defineConfig } from 'vite';
import path from "path"
export default defineConfig({
  plugins: [
    // ...other plugins
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