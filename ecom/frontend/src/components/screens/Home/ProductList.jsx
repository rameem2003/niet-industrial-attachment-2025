import React, { useEffect, useState } from "react";
import Container from "../../common/Container";
import ProductCard from "../../common/ProductCard";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/product/all");
      console.log(res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className=" my-10">
      <Container>
        <h2 className=" text-3xl text-black font-medium text-center">
          Products
        </h2>
        <p className=" mt-1 text-center text-black font-medium text-base">
          Order it for you or for your beloved ones{" "}
        </p>

        <div className="mt-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 8).map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductList;
