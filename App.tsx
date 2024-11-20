import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/react-query';
import Router from './src/routes';
import {ThemeProvider} from './src/context/ThemeContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
