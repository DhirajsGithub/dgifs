import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/react-query';
import Router from './src/routes';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
