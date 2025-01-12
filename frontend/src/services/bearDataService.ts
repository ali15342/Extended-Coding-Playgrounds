import type { BearDataResponse } from '../models/bearDataResponse';

const BASE_URL = 'http://localhost:3000/api';

export const getBearData = async (): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/bear-data`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = (await response.json()) as BearDataResponse;

    if (data.wikitext != null) {
      return data.wikitext;
    } else {
      throw new Error('Failed to fetch valid wikitext');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
