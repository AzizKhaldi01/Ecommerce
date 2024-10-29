 function createSlug(title, category) {
    const slugify = (text) => {
      return text
        .toString() 
        .toLowerCase() 
        .trim()
        .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with a hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
    };
  
    const uniqueId = Date.now(); // You can also use other methods like UUID, shortid, etc.
  
    const titleSlug = slugify(title);
    const categorySlug = slugify(category);

    return `${categorySlug}-${titleSlug}-${uniqueId}`;
  }
  module.exports = { createSlug };