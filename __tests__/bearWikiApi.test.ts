import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { fetchImageUrl } from '../src/services/bearImageService';
import { checkImageAvailability } from '../src/services/imageAvailability';

const PLACEHOLDER_IMAGE = 'media/placeholder.png';
const ERROR_NETWORK = new Error('Network Error');
const HTTP_STATUS_OK = 200;
const ARRAY_BUFFER_SIZE = 0;

// Mocking the module with a specified type
vi.mock('../src/services/imageAvailability', () => ({
  checkImageAvailability: vi.fn<() => Promise<boolean>>(),
}));

describe('fetchImageUrl', () => {
  const mockFetch = vi.fn<() => Promise<Response>>();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the image URL if available', async () => {
    const mockImageUrl = 'https://example.com/image.jpg';

    const mockResponse: Response = {
      json: async () => ({
        query: {
          pages: {
            '123': {
              imageinfo: [{ url: mockImageUrl }],
            },
          },
        },
      }),
      headers: new Headers(),
      ok: true,
      redirected: false,
      status: HTTP_STATUS_OK,
      statusText: 'OK',
      type: 'basic',
      url: '',
      clone: () => mockResponse,
      body: null,
      bodyUsed: false,
      arrayBuffer: async () => new ArrayBuffer(ARRAY_BUFFER_SIZE),
      blob: async () => new Blob(),
      formData: async () => new FormData(),
      text: async () => '',
    };

    // Mock the fetch response
    mockFetch.mockResolvedValueOnce(mockResponse);

    // Mock checkImageAvailability safely
    const checkImageAvailabilityMock = checkImageAvailability as unknown as {
      mockResolvedValueOnce: (value: boolean) => void;
    };
    checkImageAvailabilityMock.mockResolvedValueOnce(true);

    const result = await fetchImageUrl('testImage.jpg');

    // Expect the result to be the image URL
    expect(result).toBe(mockImageUrl);
    expect(checkImageAvailability).toHaveBeenCalledWith(mockImageUrl);
  });

  it('should return the placeholder image if the URL is not available', async () => {
    const mockImageUrl = 'https://example.com/image.jpg';

    const mockResponse: Response = {
      json: async () => ({
        query: {
          pages: {
            '123': {
              imageinfo: [{ url: mockImageUrl }],
            },
          },
        },
      }),
      headers: new Headers(),
      ok: true,
      redirected: false,
      status: HTTP_STATUS_OK,
      statusText: 'OK',
      type: 'basic',
      url: '',
      clone: () => mockResponse,
      body: null,
      bodyUsed: false,
      arrayBuffer: async () => new ArrayBuffer(ARRAY_BUFFER_SIZE),
      blob: async () => new Blob(),
      formData: async () => new FormData(),
      text: async () => '',
    };

    // Mock the fetch response
    mockFetch.mockResolvedValueOnce(mockResponse);

    // Mock checkImageAvailability safely
    const checkImageAvailabilityMock = checkImageAvailability as unknown as {
      mockResolvedValueOnce: (value: boolean) => void;
    };
    checkImageAvailabilityMock.mockResolvedValueOnce(false);

    const result = await fetchImageUrl('testImage.jpg');

    // Expect the result to be the placeholder image
    expect(result).toBe(PLACEHOLDER_IMAGE);
  });

  it('should return the placeholder image if fetch fails', async () => {
    // Mock the fetch to throw an error
    mockFetch.mockRejectedValueOnce(ERROR_NETWORK);

    // Mock console.error to suppress the error log during this test
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((...args: unknown[]) => {
        // No-op implementation to avoid empty function error
      });

    const result = await fetchImageUrl('testImage.jpg');

    // Expect the result to be the placeholder image
    expect(result).toBe(PLACEHOLDER_IMAGE);

    // Ensure that console.error was called with the correct error message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching image URL:',
      ERROR_NETWORK
    );

    // Restore console.error after the test
    consoleErrorSpy.mockRestore();
  });
});
