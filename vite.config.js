import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shows: resolve(__dirname, 'shows.html'),
        movieDetails: resolve(__dirname, 'movie-details.html'),
        tvDetails: resolve(__dirname, 'tv-details.html'),
        search: resolve(__dirname, 'search.html'),
      },
    },
  },
});
