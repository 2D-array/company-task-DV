import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const dashboardAPI = {
  // Get all data
  getAllData: () => api.get('/data'),
  
  // Get filtered data
  getFilteredData: (filters) => {
    const params = new URLSearchParams();
    
    // Add non-empty filters to params
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.append(key, value);
      }
    });
    
    return api.get(`/data/filtered?${params.toString()}`);
  },
  
  // Get unique values for filter options
  getUniqueValues: (column) => api.get(`/data/unique/${column}`),
};

// Add connection test function
export const testConnection = async () => {
  try {
    const response = await api.get('/');
    return { connected: true, message: response.data.message };
  } catch (error) {
    return { 
      connected: false, 
      message: 'Cannot connect to backend server. Make sure it\'s running on port 5000.' 
    };
  }
};

export default api;