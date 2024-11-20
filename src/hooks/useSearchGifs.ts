import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSearchGifs } from '../api/services/fetchSearchGifs';

const useSearchGifs = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['searchGifs', query],
    queryFn: ({ pageParam = 0 }) =>
      fetchSearchGifs({ query, offset: pageParam }),
    getNextPageParam: lastPage => {
      const nextOffset = lastPage.pagination.offset + lastPage.pagination.count;
      if (nextOffset < lastPage.pagination.total_count) {
        return nextOffset;
      }
      return undefined;
    },
    enabled: !!query, 
    keepPreviousData: true,
  });
};

export { useSearchGifs };
