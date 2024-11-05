import axios from "axios";

const baseUrl = "http://localhost:5000";

interface LoginCredentials {
  email: string;
  password: string;
}

export const Login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${baseUrl}/api/login`, {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// export const createUser = async (userData) => {
//   try {
//     const response = await axios.post(`${baseUrl}/users`, userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error
//  creating user:', error);
//     throw error;
//   }
// };
