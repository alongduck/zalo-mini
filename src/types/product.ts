export interface PercentSale {
  type: "percent";
  percent: number;
}

export interface FixedSale {
  amount: number;
  type: "fixed";
}

export type Sale = PercentSale | FixedSale;

export interface Option {
  id: string;
  label?: string;
  priceChange?: Sale;
}

export interface BaseVariant {
  id: string;
  label?: string;
  options: Option[];
}

export interface SingleOptionVariant extends BaseVariant {
  type: "single";
  default?: string;
}

export interface MultipleOptionVariant extends BaseVariant {
  type: "multiple";
  default?: string[];
}

export type Variant = SingleOptionVariant | MultipleOptionVariant;

interface Image {
  src: string;
  alt: string;
  key: string;
}


export interface Product {
  id: string;
  name: string;
  images: Image[];  // Cập nhật để là một mảng các đối tượng Image
  price: number;
  categoryId: string[];
  description?: string;
  sale?: Sale;
  variants?: Variant[];
}

