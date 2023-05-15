import { TProduct } from "../builder/ProductBuilder";

interface Iterator<T> {
  current(): T;
  next(): T;
  hasNext(): boolean;
  reset(): void;
}

class ProductIterator implements Iterator<TProduct> {
  private collection: TProduct[];
  private position: number = 0;

  constructor(collection: TProduct[]) {
    this.collection = collection;
  }

  public current(): TProduct {
    return this.collection[this.position];
  }

  public next(): TProduct {
    return this.collection[this.position++];
  }

  public hasNext(): boolean {
    return this.position < this.collection.length;
  }

  public reset(): void {
    this.position = 0;
  }
}

interface IterableCollection {
  getIterator(): Iterator<TProduct>;
}

export class ProductCollection implements IterableCollection {
  private collection: TProduct[];

  constructor(collection: TProduct[]) {
    this.collection = collection;
  }

  public getIterator(): Iterator<TProduct> {
    return new ProductIterator(this.collection);
  }
}
