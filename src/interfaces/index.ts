export interface Product {
  name: string;
  value: number;
  id: number;
  description: string;
  category: string;
  image: string;
}

export interface Cart extends Product {
  count: number;
}
