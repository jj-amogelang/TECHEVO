import axios from 'axios';

// Point this to your real backend URL after deployment
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const fetchCities = async () => {
  try {
    const response = await axios.get(`${backendUrl}/cities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

// You can add more functions here for other API routes (like /areas, /properties, etc.)
