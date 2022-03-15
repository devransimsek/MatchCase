import {AnyAction} from 'redux';
import {
  SET_FAVORITE_MOVIE,
  SET_SEARCHED_MOVIES,
  CLEAR_SEARCHED_MOVIES,
  SET_HIDED_MOVIE,
} from '../actions/types';

// Define a type for the slice state
interface MovieReducer {
  favoritedMovies: Array<Movie>;
  searchedMovies: Array<Movie>;
  hidedMovies: Array<Movie>;
}

type Movie = {
  id: string;
  image: string;
  title: string;
  imDbRating: string;
  description: string;
};

const initialState: MovieReducer = {
  favoritedMovies: [],
  searchedMovies: [],
  hidedMovies: [],
};

const setSearchedMovies = (state: MovieReducer, action: AnyAction) => ({
  ...state,
  searchedMovies: action.payload,
});

const setFavoriteMovie = (state: MovieReducer, action: AnyAction) => {
  const isExist = state.favoritedMovies.some(
    (x: Movie) => x.id === action.payload.id,
  );
  const newFavoritedMovies = isExist
    ? state.favoritedMovies.filter((x: Movie) => x.id !== action.payload.id)
    : [...state.favoritedMovies, action.payload];
  return {
    ...state,
    favoritedMovies: newFavoritedMovies,
  };
};

const setHidedMovies = (state: MovieReducer, action: AnyAction) => {
  const newHidedMovies = [...state.hidedMovies, action.payload];
  return {
    ...state,
    hidedMovies: newHidedMovies,
  };
};

export default function movieReducer(state = initialState, action: AnyAction) {
  const types: any = {
    [SET_SEARCHED_MOVIES]: setSearchedMovies,
    [SET_FAVORITE_MOVIE]: setFavoriteMovie,
    [CLEAR_SEARCHED_MOVIES]: () => ({...state, searchedMovies: []}),
    [SET_HIDED_MOVIE]: setHidedMovies,
  };
  return types[action.type] ? types[action.type](state, action) : state;
}
