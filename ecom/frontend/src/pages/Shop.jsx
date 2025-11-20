import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import axios from "axios";
import ProductCard from "../components/common/ProductCard";
import FilterComponent from "../components/screens/shop/FilterComponent";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const fetchProducts = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/product/all");
      console.log(res.data.data);
      setProducts(res.data.data);
      setFilter(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (cat) => {
    let filteredProducts = products.filter(
      (product) => product.category._id == cat
    );
    console.log(filteredProducts);
    setFilter(filteredProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <main>
      <Container>
        <div className=" flex items-start justify-between gap-5">
          <div className="w-3/12">
            <FilterComponent handleFilter={handleFilter} />
          </div>
          <div className="w-9/12">
            <div className="mt-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filter?.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Shop;
