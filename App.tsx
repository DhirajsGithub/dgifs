import React, {useEffect} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/react-query';
import Router from './src/routes';
import {ThemeProvider} from './src/context/ThemeContext';
import Orientation from 'react-native-orientation-locker';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
