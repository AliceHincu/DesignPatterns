import React, { createContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProductProvider } from "./context/ProductContext";
import { AddProduct } from "./components/products/AddProduct";
import { Products } from "./components/products/Products";
import { ShowDiscount } from "./components/ShowDiscount";

const App = () => {
  return (
    <ProductProvider>
      <main className="App">
        <h1>Discount Manager</h1>
        <ShowDiscount></ShowDiscount>
        <AddProduct></AddProduct>
        <Products></Products>
      </main>
    </ProductProvider>
  );
  // return <A></A>;
};

export default App;
