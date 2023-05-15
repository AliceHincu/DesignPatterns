import React, { createContext, useContext, useState } from "react";
import { ClothesBuilder, FoodBuilder, TProduct } from "../patterns/builder/ProductBuilder";
import { ProductType } from "../components/products/Product";
import nextId from "react-id-generator";

export type ProductContextType = {
  products: TProduct[];
  saveProduct: (product: TProduct, type: ProductType) => void;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: any) => {
  let cBuilder = new ClothesBuilder(nextId());
  const c1 = cBuilder.setName("c1").setPrice(100).build();
  const c2 = cBuilder.reset(nextId()).setName("c2").setPrice(200).build();

  let fBuilder = new FoodBuilder(nextId());
  const f1 = fBuilder.setName("f1").setPrice(100).build();
  const f2 = fBuilder.reset(nextId()).setName("f2").setPrice(200).build();
  const [products, setProducts] = useState<TProduct[]>([c1, c2, f1, f2]);

  const saveProduct = (formData: any, type: ProductType) => {
    const id = nextId();
    let newProduct;
    if (type === ProductType.CLOTHES) {
      newProduct = cBuilder.reset(id).setName(formData.name).setPrice(formData.price).build();
    } else {
      newProduct = fBuilder.reset(id).setName(formData.name).setPrice(formData.price).build();
    }

    setProducts([...products, newProduct]);
  };

  return <ProductContext.Provider value={{ products, saveProduct }}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext) as ProductContextType;
  if (!context) {
    throw new Error("useDiscountPublisher must be used within a ProductProvider");
  }
  return context;
};
