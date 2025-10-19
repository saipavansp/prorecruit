import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { Candidate, Job, Inquiry, ApiResponse, PaginatedResponse } from '../types';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Candidate API
export const candidateAPI = {
  register: async (data: FormData): Promise<ApiResponse<{ candidateId: string }>> => {
    const response = await api.post('/candidates/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getAll: async (params?: any): Promise<PaginatedResponse<Candidate>> => {
    const response = await api.get('/candidates', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Candidate>> => {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string): Promise<ApiResponse<Candidate>> => {
    const response = await api.patch(`/candidates/${id}/status`, { status });
    return response.data;
  },

  addNote: async (id: string, text: string, addedBy?: string): Promise<ApiResponse<Candidate>> => {
    const response = await api.post(`/candidates/${id}/notes`, { text, addedBy });
    return response.data;
  },

  search: async (query: string, page = 1, limit = 10): Promise<ApiResponse<Candidate[]>> => {
    const response = await api.get('/candidates/search/query', {
      params: { q: query, page, limit }
    });
    return response.data;
  },

  getBySkill: async (skill: string, page = 1, limit = 10): Promise<ApiResponse<Candidate[]>> => {
    const response = await api.get(`/candidates/skills/${skill}`, {
      params: { page, limit }
    });
    return response.data;
  }
};

// Job API
export const jobAPI = {
  create: async (data: Partial<Job>): Promise<ApiResponse<Job>> => {
    const response = await api.post('/jobs', data);
    return response.data;
  },

  getAll: async (params?: any): Promise<PaginatedResponse<Job>> => {
    const response = await api.get('/jobs/list', { params });
    return response.data;
  },

  getActive: async (page = 1, limit = 10): Promise<PaginatedResponse<Job>> => {
    const response = await api.get('/jobs/active', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Job>> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<Job>): Promise<ApiResponse<Job>> => {
    const response = await api.put(`/jobs/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  apply: async (jobId: string, candidateId: string): Promise<ApiResponse<null>> => {
    const response = await api.post(`/jobs/${jobId}/apply`, { candidateId });
    return response.data;
  },

  incrementView: async (id: string): Promise<ApiResponse<{ views: number }>> => {
    const response = await api.post(`/jobs/${id}/view`);
    return response.data;
  },

  search: async (query: string, page = 1, limit = 10): Promise<ApiResponse<Job[]>> => {
    const response = await api.get('/jobs/search/query', {
      params: { q: query, page, limit }
    });
    return response.data;
  }
};

// Contact API
export const contactAPI = {
  submitInquiry: async (data: Inquiry): Promise<ApiResponse<{ inquiryId: string }>> => {
    const response = await api.post('/contact/inquiry', data);
    return response.data;
  },

  getAllInquiries: async (params?: any): Promise<PaginatedResponse<Inquiry>> => {
    const response = await api.get('/contact/inquiries', { params });
    return response.data;
  },

  getInquiryById: async (id: string): Promise<ApiResponse<Inquiry>> => {
    const response = await api.get(`/contact/inquiries/${id}`);
    return response.data;
  },

  updateInquiryStatus: async (id: string, status: string, assignedTo?: string): Promise<ApiResponse<Inquiry>> => {
    const response = await api.patch(`/contact/inquiries/${id}/status`, { status, assignedTo });
    return response.data;
  },

  respondToInquiry: async (id: string, message: string, respondedBy?: string): Promise<ApiResponse<Inquiry>> => {
    const response = await api.post(`/contact/inquiries/${id}/respond`, { message, respondedBy });
    return response.data;
  }
};

// Health check
export const healthCheck = async (): Promise<ApiResponse<{ status: string }>> => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
