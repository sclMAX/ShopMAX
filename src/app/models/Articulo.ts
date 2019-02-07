export interface ArticuloInterface {
  id?: string;
  nombre?: string;
  descripcion?: string;
  imageURL?: string;
  iconURL?: string;
  precio_contado?: number;
  precio_tarjeta?: number;
  stock_total?: number;
  talles?: Array<{talle: string, stock: number}>;
}

