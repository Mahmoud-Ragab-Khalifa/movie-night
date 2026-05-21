"use server";

import {
  GenresResponse,
  MovieCastResponse,
  MovieDetails,
  MovieReviewsResponse,
  MovieVideosResponse,
  TmdbResponse,
} from "@/types/tmdb";

export const getTrendingMovies = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/week`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["trending-movies"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Trending Movies");
  }

  const trendingMovies: TmdbResponse = await response.json();

  return trendingMovies.results ?? [];
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["popular-movies"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Popular Movies");
  }

  const popularMovies: TmdbResponse = await response.json();

  return popularMovies.results ?? [];
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["top-rated-movies"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Top Rated Movies");
  }

  const topRatedMovies: TmdbResponse = await response.json();

  return topRatedMovies.results ?? [];
};

export const getMoviesGenres = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/genre/movie/list`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies-genre"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Movies Genres");
  }

  const moviesGenre: GenresResponse = await response.json();

  return moviesGenre.genres ?? [];
};

export const getMoviesByGenre = async (genreId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies-by-genre"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Movies By Genre");
  }

  const moviesByGenre: TmdbResponse = await response.json();

  return moviesByGenre.results ?? [];
};

export const getMovieDetails = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movie-details"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Movie Details");
  }

  const movieDetails: MovieDetails = await response.json();

  return movieDetails ?? {};
};

export const getMovieCast = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}/credits`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movie-cast"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Movie Cast");
  }

  const movieCast: MovieCastResponse = await response.json();

  return movieCast.cast ?? [];
};

export const getMovieReviews = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}/reviews`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movie-reviews"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Movie Reviews");
  }

  const movieReviews: MovieReviewsResponse = await response.json();

  return movieReviews.results ?? [];
};

export const getMovieRecommendations = async (id: number, page: number = 1) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}/recommendations?page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movie-recommendations"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Movie Recommendations");
  }

  const movieRecommendations: TmdbResponse = await response.json();

  return movieRecommendations ?? {};
};

export const getMovieVideos = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}/videos`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movie-videos"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Movie Videos");
  }

  const movieVideos: MovieVideosResponse = await response.json();

  return movieVideos.results ?? [];
};

export const getSearchResults = async (searchQuery: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?query=${searchQuery}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["search-results"],
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error("Failed To Get Search Results");
  }

  const searchResults: TmdbResponse = await response.json();

  return searchResults.results ?? [];
};
