import type { BearDataResponse } from '../models/bearDataResponse';

const baseUrl = '/api';
const TITLE = 'List_of_ursids';
const WIKITEXT_SECTION_INDEX = 3;

const fetchBearData = async (
  params: Record<string, string>
): Promise<string | null> => {
  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = (await res.json()) as BearDataResponse;

    return data.parse.wikitext['*'];
  } catch (error) {
    console.error('Error fetching bear data:', error);
    return null;
  }
};

export const getBearData = async (): Promise<string> => {
  try {
    const params: Record<string, string> = {
      action: 'parse',
      page: TITLE,
      prop: 'wikitext',
      section: String(WIKITEXT_SECTION_INDEX),
      format: 'json',
      origin: '*',
    };

    const wikitext = await fetchBearData(params);
    if (typeof wikitext === 'string') {
      return wikitext;
    } else {
      throw new Error('Failed to fetch valid wikitext');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
