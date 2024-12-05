import { useEffect, useState } from "react";

const useCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchedCategory = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      if (!response.ok) {
        const errorMessage = `Fatching category data failed ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setCategory(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedCategory();
  }, []);

  return { category, loading, error };
};

export default useCategory;
