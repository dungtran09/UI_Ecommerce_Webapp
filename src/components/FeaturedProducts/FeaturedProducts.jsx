import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetProducts } from "../../apis/apiProducts";
import path from "../../utils/path";
import statusCode from "../../utils/statusCode";
import Title from "../Title/Title";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({
      totalRatings: { gt: 4.5 },
      sort: "-price",
    });

    if (response?.status === statusCode.SUCCESS) {
      setFeaturedProducts(response.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const featuredProductsEls = featuredProducts?.map((product, index) => (
    <FeaturedProductCard
      key={index}
      thumb={product?.thumb}
      title={product?.title}
      price={product?.price}
      totalRatings={product?.totalRatings}
      _id={product?._id}
      category={product?.categoryName}
      slug={product?.slug}
    />
  ));

  return (
    <>
      <Title title="Featured Products" />
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {featuredProductsEls}
      </div>
    </>
  );
};

export default FeaturedProducts;
