import { useState } from "react";
import Arrival from "./arrivals";
import Cart from "./Cart";
import Filter from "./Filter";
import ProductCard from "./Product-Card";
import Search from "./Search";
import Sort from "./Sort";

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortProduct, setSortProduct] = useState("");
  return (
    <div>
      <div className="pt-16 sm:pt-24 lg:pt-40">
        <Arrival />
        <div className="mt-10">
          <div className="flex justify-between relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            {/* <!-- Sort & Filter--> */}
            <div className="w-full">
              <Sort setSort={setSortProduct} />
              <Filter />
            </div>

            {/* <!-- Search and Cart --> */}
            <div className="flex gap-2 items-center">
              {/* <!-- Search --> */}
              <Search setSearchTerm={setSearchTerm} />

              {/* <!-- Cart --> */}
              <Cart />
            </div>
          </div>
        </div>
        <div>
          <ProductCard searchTerm={searchTerm} sortProduct={sortProduct} />
        </div>
      </div>
    </div>
  );
}
