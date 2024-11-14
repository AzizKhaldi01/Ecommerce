export interface Size {
  size: string;
  quantity: number;
}

export interface Attribute {
  key: string;
  value: string;
}

export interface Variant {
  title: string;
  id: number;
  attributes?: Attribute[];
  availableSizes: Size[];
  image: string[];
  quantity: number;
  price: number;
}

export interface ProductState {
  title: string;
  slog: string;
  status: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  rating: number;
  purchase: number;
  minimumquantity: number;
  sold: number;
  discount: number;
  images: File[];
  gender: string;
  stock: number;
  variants: Variant[];
}
