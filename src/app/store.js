import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tmdbApi } from "../services/TMDB";
import { genreOrCategory } from "../features/currentGenreOrCategory";
import userReducer from "../features/auth";

// const middleware = [...getDefaultMiddleware(), tmdbApi.middleware];

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategory.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat([tmdbApi.middleware]),
});
