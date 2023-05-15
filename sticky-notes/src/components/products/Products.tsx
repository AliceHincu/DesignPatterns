import React, { useContext } from "react";
import { ProductContext, ProductContextType } from "../../context/ProductContext";
import { TProduct } from "../../patterns/builder/ProductBuilder";
import { Product } from "./Product";
import { ProductCollection } from "../../patterns/iterator/ProductIterator";

export const Products = () => {
  const { products } = useContext(ProductContext) as ProductContextType;

  const productCollection = new ProductCollection(products);
  const iterator = productCollection.getIterator();
  const productComponents: any = [];

  while (iterator.hasNext()) {
    let product: TProduct = iterator.next();
    productComponents.push(<Product key={product.id} product={product} />);
  }

  return <>{productComponents}</>;
};
