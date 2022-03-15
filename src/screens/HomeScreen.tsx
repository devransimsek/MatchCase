import React, {useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MovieCard, SearchMovie} from '../components';
import {useAppDispatch, useAppSelector} from '../helpers/hooks';
import {clearSearchedMovies} from '../store/actions/movie-actions';

type Movie = {
  id: string;
  image: string;
  title: string;
  imDbRating: string;
  description: string;
};

const HomeScreen: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(state => state.movies);
  useEffect(() => {
    dispatch(clearSearchedMovies());
  }, []);

  const moviesData = useMemo(() => {
    if (movies.searchedMovies?.length) {
      let filteredData: Array<Movie> = [];
      movies.searchedMovies.map((item: Movie) => {
        if (!movies.hidedMovies?.some((x: Movie) => x.id === item.id)) {
          filteredData.push(item);
        }
      });
      return filteredData;
    } else {
      return movies.favoritedMovies;
    }
  }, [movies.favoritedMovies, movies.searchedMovies, movies.hidedMovies]);

  return (
    <View style={styles.container}>
      <SearchMovie />
      <FlatList
        contentContainerStyle={{paddingHorizontal: 18, paddingBottom: 18}}
        data={moviesData}
        renderItem={({item, index}) => {
          return <MovieCard movie={item} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
