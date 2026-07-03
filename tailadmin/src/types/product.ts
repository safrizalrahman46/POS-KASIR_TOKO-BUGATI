export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface Product {
  id: number;
  category_id: number;
  barcode: string;
  name: string;
  price: number;
  cost_price: number;
  stock: number;
  min_stock: number;
  image: string;
  is_active: boolean;
  created_at: string;
  category?: Category;
}

export interface ProductInput {
  category_id: number;
  barcode?: string;
  name: string;
  price: number;
  cost_price?: number;
  stock?: number;
  min_stock?: number;
  image?: string;
  is_active?: boolean;
}
