import axios from 'axios';
import Config from 'react-native-config';
import {GiphyResponse} from '../../types/gif';

const fetchSearchGifs = async ({
  query,
  limit = 25,
  offset = 0,
}: {
  query: string;
  limit?: number;
  offset?: number;
}): Promise<GiphyResponse> => {
  try {
    const response = await axios.get<GiphyResponse>(
      `${Config.GIPHY_BASE_URL}/v1/gifs/search`,
      {
        params: {
          api_key: Config.GIPHY_API_KEY,
          q: query,
          limit,
          offset,
          rating: 'g',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch search results');
  }
};

export {fetchSearchGifs};
