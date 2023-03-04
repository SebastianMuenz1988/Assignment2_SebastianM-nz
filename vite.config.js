import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//Include the backend so that it can be reached writing fetch(‘/api/rest-route’)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://cinema-rest.nodehill.se",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

// A variable that will contain a list of movies
// --> fectch data and loop it

// Problem cors - a web browser only wants to make the requests to one page from
// one domain!
// proxy (stellvertreter) config: (vite.confi.js)
