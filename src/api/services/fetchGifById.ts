import axios from 'axios';
import Config from 'react-native-config';
import {GiphyDetailResponse} from '../../types/gif';

const fetchGifById = async (gifId: string): Promise<GiphyDetailResponse> => {
  try {
    const response = await axios.get<{data: GiphyDetailResponse}>(
      `${Config.GIPHY_BASE_URL}/v1/gifs/${gifId}`,
      {
        params: {
          api_key: Config.GIPHY_API_KEY,
        },
      },
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch GIF details');
  }
};

export {fetchGifById};
