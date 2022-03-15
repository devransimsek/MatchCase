import {
  SET_SEARCHED_MOVIES,
  SET_FAVORITE_MOVIE,
  CLEAR_SEARCHED_MOVIES,
  SET_HIDED_MOVIE,
} from './types';

type Movie = {
  id: string;
  image: string;
  title: string;
  imDbRating: string;
  description: string;
};

export const setSearchedMovies = (movies: Array<[]>) => ({
  type: SET_SEARCHED_MOVIES,
  payload: movies,
});

export const favoriteMovie = (movie: Movie) => ({
  type: SET_FAVORITE_MOVIE,
  payload: movie,
});

export const hidedMovies = (movie: Movie) => ({
  type: SET_HIDED_MOVIE,
  payload: movie,
});

export const clearSearchedMovies = () => ({
  type: CLEAR_SEARCHED_MOVIES,
});

export const searchMovie = (
  title: string,
  success: CallableFunction,
  error: CallableFunction,
) => {
  return async (dispatch: any) => {
    try {
      const request = await fetch(
        `https://imdb-api.com/API/AdvancedSearch/k_j613090w?title=${title}&title_type=tv_movie,tv_series`,
      );
      const response = await request.json();
      if (!response.errorMessage && response?.results) {
        dispatch(setSearchedMovies(response.results));
        const isNoResult = !response?.errorMessage && !response?.results.length;
        success(isNoResult);
      } else {
        error(response.errorMessage);
      }
    } catch (er) {
      error((er as Error).message);
    }
  };
};
