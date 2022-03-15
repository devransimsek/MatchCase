import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '../helpers/hooks';
import {favoriteMovie, hidedMovies} from '../store/actions/movie-actions';
import {useNavigation} from '@react-navigation/native';
type Movie = {
  id: string;
  image: string;
  title: string;
  imDbRating: string;
  description: string;
};
type MovieCardProps = {
  movie: Movie;
};
const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const movies = useAppSelector(state => state.movies);

  const _favoriteMovie = useCallback(() => {
    dispatch(favoriteMovie(movie));
  }, []);

  const _hidedMovie = useCallback(() => {
    dispatch(hidedMovies(movie));
  }, []);

  const isFavorited = useMemo(
    () => movies.favoritedMovies.some((x: Movie) => x.id === movie.id),
    [movies.favoritedMovies],
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('MovieDetail', {movie})}>
        <Text style={styles.title}>{movie.title}</Text>
        <ImageBackground source={{uri: movie.image}} blurRadius={10}>
          <FastImage
            source={{uri: movie.image, priority: FastImage.priority.high}}
            style={styles.image}
            resizeMode={'contain'}
          />
        </ImageBackground>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          {movie.imDbRating && (
            <Text style={styles.desc}>IMDB RATE {movie.imDbRating}</Text>
          )}
          <Text style={styles.desc}>{movie.description}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!isFavorited && (
            <TouchableOpacity onPress={_hidedMovie} style={{marginRight: 10}}>
              <Text>🚫</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={_favoriteMovie}>
            {isFavorited ? (
              <Text style={{fontSize: 20}}>👎</Text>
            ) : (
              <Text style={{fontSize: 20}}>👍</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // elevation: 10,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  desc: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  image: {
    height: 200,
  },
});
