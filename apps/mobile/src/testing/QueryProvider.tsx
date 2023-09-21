import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

export const QueryProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        staleTime: 0,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
