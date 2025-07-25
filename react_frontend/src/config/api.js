// API configuration utility
const API_BASE_URL = "http://192.168.49.2:30081"

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
  // Auth endpoints (no JWT required)
  LOGIN: `${API_BASE_URL}/api/auth/login`,

  // Todo endpoints (JWT required)
  TODOS: `${API_BASE_URL}/api/todos`,
  TODO_BY_ID: (id) => `${API_BASE_URL}/api/todos/${id}`,

  // Step endpoints (JWT required)
  STEPS: `${API_BASE_URL}/api/steps`,
  STEPS_BY_TODO_ID: (todoId) => `${API_BASE_URL}/api/steps/todo/${todoId}`,
  STEP_BY_ID: (stepId) => `${API_BASE_URL}/api/steps/${stepId}`,

  // Legacy endpoints (for backward compatibility - can be removed after full React migration)
  LEGACY: {
    INDEX: `${API_BASE_URL}/legacy/`,
    TODO: `${API_BASE_URL}/legacy/todo`,
    STEP: (todoId) => `${API_BASE_URL}/legacy/todo/${todoId}`
  }
};

export default API_ENDPOINTS;
