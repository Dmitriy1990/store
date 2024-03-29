import { Sorted } from './sort';

export interface Product {
  id: number;
  title: string;
  description: string;
  discount: number;
  price: number;
  oldPrice: number;
  image: string;
  fullDescription: string;
  count: number;
}

export interface ProductProps {
  sort: Sorted;
  num: number;
}
