export interface Tire {
  id: number;
  brand: string;
  model: string;
  size: string; // e.g., "205/55 R16"
  price: number;
  stock: number;
  category: 'Summer' | 'Winter' | 'All-Season';
}
