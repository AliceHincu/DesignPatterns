import { DiscountGenerator } from "../singleton/DiscountGenerator";
import axios from "axios";

export interface IDiscountService {
  getDiscount(): Promise<number>;
}

class MyDiscountService implements IDiscountService {
  getDiscount(): Promise<number> {
    return Promise.resolve(DiscountGenerator.getInstance().generateDiscount());
  }
}

class ThirdPartyDiscountService {
  async callAPI(): Promise<number> {
    const response = await axios.get(
      "https://www.random.org/integers/?num=1&min=5&max=25&col=1&base=10&format=plain&rnd=new"
    );
    return response.data; // Convert to a decimal
  }
}

// You can create an adapter to make ThirdPartyDiscountService match the IDiscountService interface.
class DiscountAdapter implements IDiscountService {
  private adaptee: ThirdPartyDiscountService;

  constructor(adaptee: ThirdPartyDiscountService) {
    this.adaptee = adaptee;
  }

  getDiscount(): Promise<number> {
    return this.adaptee.callAPI();
  }
}

// Usage:

export const myService = new MyDiscountService();
const thirdPartyService = new ThirdPartyDiscountService();
export const adapter = new DiscountAdapter(thirdPartyService);
