export abstract class TProduct {
  id: string;
  name: string;
  price: number;

  constructor(builder: ProductBuilder) {
    this.id = builder.id;
    this.name = builder.name;
    this.price = builder.price;
  }

  abstract cloneWithNewPrice(newPrice: number): TProduct;
}

export class ClothesProduct extends TProduct {
  cloneWithNewPrice(newPrice: number): ClothesProduct {
    return new ClothesBuilder(this.id).setName(this.name).setPrice(newPrice).build();
  }
}

export class FoodProduct extends TProduct {
  cloneWithNewPrice(newPrice: number): FoodProduct {
    return new FoodBuilder(this.id).setName(this.name).setPrice(newPrice).build();
  }
}

export abstract class ProductBuilder {
  id: string;
  name: string;
  price: number;

  constructor(id: string) {
    this.id = id;
    this.name = "";
    this.price = 0;
  }

  get Id() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  get Price() {
    return this.price;
  }

  setName(name: string): ProductBuilder {
    this.name = name;
    return this;
  }

  setPrice(price: number): ProductBuilder {
    this.price = price;
    return this;
  }

  abstract build(): TProduct;
  abstract reset(id: string): void;
}

export class ClothesBuilder extends ProductBuilder {
  build(): TProduct {
    return new ClothesProduct(this);
  }
  reset(id: string): ClothesBuilder {
    return new ClothesBuilder(id);
  }
}

export class FoodBuilder extends ProductBuilder {
  build(): TProduct {
    return new FoodProduct(this);
  }
  reset(id: string): FoodBuilder {
    return new FoodBuilder(id);
  }
}
