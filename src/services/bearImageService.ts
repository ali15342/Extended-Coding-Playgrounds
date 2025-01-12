import { checkImageAvailability } from './imageAvailability';

const baseUrl = '/api';
const NO_IMAGE_INFO_LENGTH = 0;
const IMAGE_INFO_ARRAY_INDEX = 0;
const FIRST_PAGE_INDEX = 0;

const fetchImageUrl = async (fileName: string): Promise<string> => {
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
  const placeholderImage = 'media/placeholder.png';
  try {
    const res = await fetch(url);
    const data = (await res.json()) as {
      query: { pages: Record<string, { imageinfo?: Array<{ url: string }> }> };
    };
    const {
      query: { pages },
    } = data;
    const firstPage = Object.values(pages)[FIRST_PAGE_INDEX] as {
      imageinfo?: Array<{ url: string }>;
    };
    const imageUrl =
      firstPage.imageinfo != null &&
      firstPage.imageinfo.length > NO_IMAGE_INFO_LENGTH
        ? firstPage.imageinfo[IMAGE_INFO_ARRAY_INDEX].url
        : undefined;
    const imageAvailable =
      imageUrl != null ? await checkImageAvailability(imageUrl) : false;
    return imageAvailable && imageUrl != null ? imageUrl : placeholderImage;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return placeholderImage;
  }
};

export { fetchImageUrl };
