import axios from "axios";

const baseUrl = "http://localhost:5000";

interface GetProductsParams {
  page: number;
  limit: number;
}

export const getProducts = async ({ page, limit }: GetProductsParams) => {
  try {
    const response = await axios.get(`${baseUrl}/api/products`, {
      params: {
        page,
        limit,
      },
    });
   
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};



export const getProductInfosAPI = async (slog: string) => {
  try {
    const response = await axios.get(`${baseUrl}/api/productInfo/${slog}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};