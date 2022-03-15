import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MovieCard} from '../components';

const MovieDetailScreen: React.FC<any> = ({route}) => {
  const {movie} = route.params;
  return (
    <View style={styles.container}>
      <MovieCard movie={movie} />
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 18},
});
