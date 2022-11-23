import "./products.css";
import { Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { StoreItem } from "../../main/components/storeitem";
import React from "react";


const Products = () => {

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      console.log('url', `${process.env.REACT_APP_API_URL}/product/get-all`);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
      console.log("test", response.data.resultData.data);
      setProducts(response.data.resultData.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []);

  return (

    <>
      <div className="productspage">
        <Row md={2} xs={2} lg={3} >
          {products.map((product, index) => {
            return <StoreItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              base64Image={`data:image/png;base64, ${product.base64Image}`} shortDescription={""}></StoreItem>
          })}
        </Row>
      </div>
    </>


  );
}
export default Products;