// Check image availability
const checkImageAvailability = async (
  imageUrl: string | URL | Request
): Promise<boolean> => {
  try {
    const response = await fetch(imageUrl);
    return response.ok;
  } catch (error) {
    console.error('Error occurred while checking image availability:', error);
    return false;
  }
};

export { checkImageAvailability };
