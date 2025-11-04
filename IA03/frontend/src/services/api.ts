import axiosInstance from './axios';

export interface RegisterData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    email: string;
    createdAt: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  email: string;
  createdAt: string;
}

// Register user
export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axiosInstance.post('/user/register', data);
  return response.data;
};

// Login user
export const loginUser = async (data: LoginData): Promise<TokensResponse> => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

// Get user profile (protected route)
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/user/profile');
  return response.data;
};
