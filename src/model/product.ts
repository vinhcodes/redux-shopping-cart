export interface Rating {
  rate: number;
  count: number;
}

export interface Options {
  id: number;
  option: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  CategoryId: string;
  status: string;
  imageUrl: string;
  quantity: number;
  createdAt: Date;
  rating: Rating;
  options: Options[];
}
