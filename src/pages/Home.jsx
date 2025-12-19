import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import HomeCarousel from "../components/HomeCarousel";

const Home = ({ addToCart, searchQuery, selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/products.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Products load error", err));
  }, []);

  const filteredProducts = products
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .filter((p) =>
      searchQuery
        ? p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <div className="homePage">
      <HomeCarousel />

      <section className="productGrid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p className="noProducts">No products found</p>
        )}
      </section>
    </div>
  );
};

export default Home;
