import React, { FormEvent, useEffect, useState } from "react";
import { TProduct } from "../../patterns/builder/ProductBuilder";
import { DiscountSubscriber } from "../../patterns/observable/DiscountSubscriber";
import discountPublisher from "../../patterns/observable/DiscountPublisher";

export enum ProductType {
  FOOD = "food",
  CLOTHES = "clothes",
}

interface ProductProps {
  product: TProduct;
}

export const Product = ({ product }: ProductProps) => {
  const [currentProduct, setCurrentProduct] = useState(product);
  const [isDiscountable, setIsDiscountable] = useState(false);

  const onDiscountUpdated: DiscountSubscriber = (discount: number) => {
    const newPrice = product.price - (product.price * discount) / 100;
    const newP = product.cloneWithNewPrice(newPrice);
    setCurrentProduct(newP);
  };

  const handleCheckboxChange = (e: FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.checked) {
      discountPublisher.subscribe(onDiscountUpdated);
      setIsDiscountable(true);
    } else {
      discountPublisher.unsubscribe(onDiscountUpdated);
      setIsDiscountable(false);
      setCurrentProduct(product);
    }
  };

  return (
    <div className="Card">
      <div className="Card--text">
        <div>
          <h1>{currentProduct.name}</h1>
          <span>{isDiscountable ? currentProduct.price : product.price}</span>
          <div>
            <label htmlFor="isDiscountable">Get Discounts</label>
            <input onChange={handleCheckboxChange} type="checkbox" id="isDiscountable" />
          </div>
        </div>
      </div>
    </div>
  );
};
