import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { SpiffyBtn } from "./elements/SpiffyBtn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [productsList, setProducts] = useState([]);

  const [sortType, setsortType] = useState("");

  const loadAllproduct = () => {
    getProducts().then((data) => {
      if (data.error) {
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllproduct();
  }, []);
  //sort Functionality
  useEffect(() => {
    sortArray(sortType);
  }, [sortType]);
  const compare = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };
  const sortArray = (type) => {
    console.log(type);
    const types = {
      name: "name",
      price: "price",
      stock: "stock",
      sold: "sold",
    };

    const sortProperty = types[type];
    const sorted =
      type === "name"
        ? [...productsList].sort(compare)
        : [...productsList].sort((a, b) => a[sortProperty] - b[sortProperty]);
    console.log(sorted);
    setProducts(sorted);
  };

  return (
    <div>
      <Base title="All Products" description="Find all our own creation">
        <ToastContainer />

        <select
          class="Sort_Button p-2 rounded m-3"
          onChange={(e) => setsortType(e.target.value)}
        >
          <option selected>Sort-By</option>
          <option value="stock">Stock</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="sold">Sold</option>
        </select>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {productsList.map((product, index) => {
            return (
              // <div key={index} className="col-6">
              <Card product={product} />
              // </div>
            );
          })}
        </div>
      </Base>
    </div>
  );
};

export default Products;
