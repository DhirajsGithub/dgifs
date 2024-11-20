import axios from 'axios';
import Config from 'react-native-config';
import { GiphyResponse } from '../../types/gif'; 

interface FetchTrendingParams {
  limit?: number;
  offset?: number;
}

const fetchTrendingGifs = async ({
  limit = 25,
  offset = 0,
}: FetchTrendingParams = {}): Promise<GiphyResponse> => {
  try {
    const response = await axios.get<GiphyResponse>(
      `${Config.GIPHY_BASE_URL}/v1/gifs/trending`,
      {
        params: {
          api_key: Config.GIPHY_API_KEY,
          limit,
          offset,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('The request took too long');
    }
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

export { fetchTrendingGifs };
