import { useState } from "react";
import { ProductContext } from "../context";
import { useProduct } from "../hooks";

const ProductProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { productData, loading, error } = useProduct(selectedCategory);

  return (
    <ProductContext.Provider
      value={{
        productData,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
