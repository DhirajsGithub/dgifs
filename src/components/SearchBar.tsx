import React, {useState, useCallback} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {debounce} from '../utils/debounce';
import {useTheme} from '../context/ThemeContext'; // Import the theme context

const SearchBar = ({onSearch}: {onSearch: (query: string) => void}) => {
  const [text, setText] = useState('');
  const {theme} = useTheme();

  const handleSearch = useCallback(
    debounce((query: string) => onSearch(query), 500),
    [],
  );

  const onChangeText = (value: string) => {
    setText(value);
    handleSearch(value);
  };

  const clearText = () => {
    setText('');
    onSearch('');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <TextInput
        style={[
          styles.input,
          {backgroundColor: theme.inputBackgroundColor, color: theme.textColor},
        ]}
        placeholder="Search GIFs..."
        placeholderTextColor={theme.placeholderTextColor}
        value={text}
        onChangeText={onChangeText}
        autoCorrect={false}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={clearText} style={styles.clearButton}>
          <Text style={[styles.clearButtonText, {color: theme.textColor}]}>
            ×
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    bottom: '57%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  clearButtonText: {
    fontSize: 25,
    // fontWeight: 'bold',
  },
});

export default SearchBar;
