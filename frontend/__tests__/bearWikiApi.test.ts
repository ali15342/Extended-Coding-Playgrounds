import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { fetchImageUrl } from '../src/services/bearImageService';

const PLACEHOLDER_IMAGE = 'media/placeholder.png';
const ERROR_NETWORK = new Error('Network Error');

describe('fetchImageUrl', () => {
  const mockFetch = vi.fn<() => Promise<Response>>();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the placeholder image if fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(ERROR_NETWORK);

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((...args: unknown[]) => {
        // No-op implementation to avoid empty function error
      });

    const result = await fetchImageUrl('testImage.jpg');

    expect(result).toBe(PLACEHOLDER_IMAGE);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching image URL:',
      ERROR_NETWORK
    );

    consoleErrorSpy.mockRestore();
  });
});
