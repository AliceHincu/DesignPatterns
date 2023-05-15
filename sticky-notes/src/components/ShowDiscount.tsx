import { useEffect, useState } from "react";
import { DiscountSubscriber } from "../patterns/observable/DiscountSubscriber";
import discountPublisher from "../patterns/observable/DiscountPublisher";

export const ShowDiscount = () => {
  const [discount, setDiscount] = useState(0);

  const onDiscountUpdated: DiscountSubscriber = (discount: number) => {
    setDiscount(discount);
  };

  useEffect(() => {
    discountPublisher.subscribe(onDiscountUpdated);

    return () => discountPublisher.unsubscribe(onDiscountUpdated);
  }, []);

  return <>Dicount: {discount}%</>;
};
