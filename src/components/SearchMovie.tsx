import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from '../helpers/hooks';
import {searchMovie} from '../store/actions/movie-actions';

const SearchMovie: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isNoResult, setIsNoResult] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const search = async () => {
    if (value) {
      setLoading(true);
      dispatch(
        searchMovie(
          value,
          (isNoResult: Boolean) => {
            setIsNoResult(isNoResult);
            setLoading(false);
            !isNoResult && Keyboard.dismiss();
            error && setError('');
          },
          (errorMessage: string) => {
            setError(errorMessage);
            setLoading(false);
            Keyboard.dismiss();
          },
        ) as any,
      );
    }
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder="Entry a Movie or Show..."
          placeholderTextColor={'gray'}
          onChangeText={text => {
            setValue(text);
            isNoResult && setIsNoResult(false);
          }}
          onSubmitEditing={search}
        />
        <TouchableOpacity style={styles.searchButton} onPress={search}>
          {loading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <Text style={styles.searchText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>
      {isNoResult && (
        <Text style={styles.noResultText}>
          There is no any result for "{value}"
        </Text>
      )}
      {error ? <Text style={styles.noResultText}>{error}</Text> : <></>}
    </>
  );
};

export default SearchMovie;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    margin: 18,
    marginBottom: 5,
  },
  input: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 70,
    color: 'black',
  },
  searchButton: {
    position: 'absolute',
    right: 10,
    paddingVertical: 10,
  },
  searchText: {
    fontWeight: 'bold',
    color: 'black',
  },
  noResultText: {
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 18,
  },
});
