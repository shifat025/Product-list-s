import { useEffect, useState } from "react";

const useProduct = (selectedCategory) => {
  const [productData, setProductData] = useState([
    {
      id: "",
      title: "",
      price: "",
      category: "",
      image: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      let url = "https://fakestoreapi.com/products";
      if (selectedCategory) {
        url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = `Fetching product data failed: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const updateProductData = data.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
      }));
      setProductData(updateProductData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, [selectedCategory]);

  return { productData, error, loading };
};

export default useProduct;
