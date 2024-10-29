// pagination.js
const paginate = async (query, limit, page) => {
  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  // Fetch the products with pagination
  const products = await query.skip(skip).limit(limit).lean(); // Use lean() for better performance

   // Clone the query for counting total documents
   const totalProducts = await query.clone().countDocuments();  

  return {
    totalProducts,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / limit),
    products,
  };
};

module.exports = paginate;
