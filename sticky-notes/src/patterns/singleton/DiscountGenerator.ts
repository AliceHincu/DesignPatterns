class DiscountGenerator {
  private static instance: DiscountGenerator;

  private constructor() {}

  static getInstance(): DiscountGenerator {
    if (!DiscountGenerator.instance) {
      DiscountGenerator.instance = new DiscountGenerator();
    }
    return DiscountGenerator.instance;
  }

  generateDiscount(): number {
    // Generate a random discount between 5 and 25
    const discountPercentage = Math.floor(Math.random() * (25 - 5) + 5);
    return discountPercentage;
  }
}

// Usage
const discountGenerator = DiscountGenerator.getInstance();
export { discountGenerator, DiscountGenerator };
