import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AllProduct from "./AllProduct";
import Product from "./Product";
import Loader from "./Loader";
import { publicRequest } from "../api/requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AllProductsList = ({ filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const res = await publicRequest.get("/products/");
      setProducts(res.data);
    };
    getProduct();
  }, []);

  useEffect(() => {
    products.length > 0 &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, filters]);

  //console.log("fil", filteredProducts);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  //console.log("cat", products);

  if (!products.length) return <Loader />;

  return (
    <>
      <Container>
        {filteredProducts.length > 0 &&
          filteredProducts.map((item) => (
            <AllProduct item={item} key={item.id} />
          ))}
      </Container>
    </>
  );
};

export default AllProductsList;
