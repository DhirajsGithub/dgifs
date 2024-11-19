import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchTrendingGifs} from '../api/services/giphyService';

const useFetchTrendingGifs = () => {
  return useInfiniteQuery({
    queryKey: ['trendingGifs'],
    queryFn: ({pageParam = 0}) => fetchTrendingGifs({offset: pageParam}),
    getNextPageParam: lastPage => {
      const nextOffset = lastPage.pagination.offset + lastPage.pagination.count;
      if (nextOffset < lastPage.pagination.total_count) {
        return nextOffset;
      }
      return undefined;
    },
    keepPreviousData: true,
  });
};

export {useFetchTrendingGifs};
