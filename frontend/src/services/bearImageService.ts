import type { BearImageResponse } from '../models/bearImageResponse';

const BASE_URL = 'http://localhost:3000/api';

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/bear-image?fileName=${fileName}`);
    const data = (await response.json()) as BearImageResponse;
    if (data.imageUrl !== '') {
      return data.imageUrl;
    } else {
      return 'media/placeholder.png';
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return 'media/placeholder.png';
  }
};
