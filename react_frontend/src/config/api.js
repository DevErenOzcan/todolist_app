// API configuration utility
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Helper function to get cookie
const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getCookie('auth_token');
  return {
    'Content-Type': 'application/json',
    'Cookie': document.cookie, // Send all cookies in Cookie header
    ...(token && { 'Authorization': `Bearer ${token}` }) // Also send as Authorization header if needed
  };
};

// Authenticated fetch wrapper
export const authenticatedFetch = async (url, options = {}) => {
  const defaultOptions = {
    credentials: 'include', // Important: include cookies in requests
    headers: getAuthHeaders(),
    ...options,
  };

  // Merge headers if options has headers
  if (options.headers) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      ...options.headers,
    };
  }

  return fetch(url, defaultOptions);
};

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}${process.env.REACT_APP_LOGIN_ENDPOINT || '/'}`,

  // Todo endpoints
  TODO: `${API_BASE_URL}${process.env.REACT_APP_TODO_ENDPOINT || '/api/todo'}`,
  TODO_BY_ID: (id) => `${API_BASE_URL}${process.env.REACT_APP_TODO_ENDPOINT || '/api/todo'}/${id}`,

  // Step endpoints
  STEP_BY_TODO_ID: (todoId) => `${API_BASE_URL}${process.env.REACT_APP_STEP_ENDPOINT || '/api/step'}/tid/${todoId}`,
  STEP_BY_ID: (stepId) => `${API_BASE_URL}${process.env.REACT_APP_STEP_ENDPOINT || '/api/step'}/sid/${stepId}`,
};

export default API_ENDPOINTS;