import { IDiscountService, adapter, myService } from "../adapter/DiscountAdapter";
import { discountGenerator } from "../singleton/DiscountGenerator";
import { DiscountSubscriber } from "./DiscountSubscriber";

class DiscountPublisher {
  private subscribers: DiscountSubscriber[] = [];
  private intervalId: any;
  private service: IDiscountService;

  public constructor(service: IDiscountService) {
    this.service = service;
  }

  public subscribe(subscriber: DiscountSubscriber) {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: DiscountSubscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers = this.subscribers.splice(index, 1);
    }
  }

  public updateDiscount() {
    this.intervalId = setInterval(async () => {
      const discountPercentage = await this.service.getDiscount();
      this.notifySubscribers(discountPercentage);
    }, 5000);
  }

  public cleanUpdates() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private notifySubscribers = (discount: number) => {
    this.subscribers.forEach((subscriber) => subscriber(discount));
  };
}

const discountPublisher = new DiscountPublisher(myService);
// const discountPublisher = new DiscountPublisher(adapter);
discountPublisher.updateDiscount();

export default discountPublisher;
