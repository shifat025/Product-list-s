import { useContext } from "react";
import { CartContext, ProductContext } from "../../context";

export default function ProductCard({ searchTerm, sortProduct }) {
  const { productData, loading, error } = useContext(ProductContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const serachProduct = productData.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...serachProduct].sort((a, b) => {
    if (sortProduct === "lowToHigh") {
      return a.price - b.price;
    } else if (sortProduct === "highToLow") {
      return b.price - a.price;
    }
  });

  const handleCarts = (productId) => {
    const found = cart.some((id) => id === productId); // Check if product is already in the cart
    if (!found) {
      addToCart(productId); // Add product if not in the cart
    } else {
      removeFromCart(productId); // Remove product if found in the cart
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* <!-- Card --> */}
          {sorted.length > 0 ? (
            sorted.map((product) =>
              loading ? (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow animate-pulse"
                >
                  {/* <!-- Image skeleton --> */}
                  <div className="bg-gray-300 h-48 rounded-md mb-4"></div>
                  {/* <!-- Title skeleton --> */}
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  {/* <!-- Category skeleton --> */}
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                  {/* <!-- Price skeleton --> */}
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                  {/* <!-- Button skeleton --> */}
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <div key={product.id} className="relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-80">
                    <img
                      src={product.image}
                      alt="Front of men&#039;s Basic Tee in black."
                      className="h-full w-full object-cover object-top lg:h-full lg:w-full p-4 bg-gray-100"
                    />
                  </div>
                  <div className="mt-4 px-3 pb-4">
                    <div>
                      <h3 className="text-sm text-gray-700">{product.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                  {/* <!-- Button --> */}
                  <div className="cursor-pointer rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 ring-1 ring-slate-700/10  hover:ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 items-center text-center mb-3 mx-3 flex-1">
                    <div
                      className="flex px-3 py-2 justify-center"
                      onClick={() => handleCarts(product.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                      {cart.some((id) => id === product.id)
                        ? "Remove From Cart"
                        : "Add To Cart"}
                      {/* Add To Cart */}
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div>No result Found</div>
          )}
        </div>
      </div>
    </div>
  );
}
