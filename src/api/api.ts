import axios from 'axios';
import { Product, ProductProps } from '../types/product';

const LIMIT = 3;

export const getProduct = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`http://localhost:3001/product/${id}`);
  if (response.status !== 200) {
    throw new Error('Error fetch data');
  }
  return response.data;
};

export const getProducts = async (
  props: ProductProps
): Promise<{ data: Product[]; count: number }> => {
  const response = await axios.get<Product[]>(
    `http://localhost:3001/product?_sort=price&_order=${props.sort}&_start=${props.num}&_limit=${LIMIT}`
  );
  if (response.status !== 200) {
    throw new Error('Error fetch data');
  }
  const count = Number(response.headers['x-total-count']);
  return { data: response.data, count };
};
