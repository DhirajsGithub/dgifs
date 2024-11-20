import {useQuery} from '@tanstack/react-query';
import {fetchGifById} from '../api/services/fetchGifById';

const useGifDetails = (gifId: string) => {
  return useQuery({
    queryKey: ['gifDetails', gifId],
    queryFn: () => fetchGifById(gifId),
    enabled: !!gifId,
  });
};

export {useGifDetails};
