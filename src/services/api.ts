import { TmdbResponse } from "@/types/tmdb";

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
