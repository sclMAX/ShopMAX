export interface ArticuloInterface {
  id?: string;
  nombre?: string;
  nombre_lowercase?: string;
  descripcion?: string;
  imageURL?: string;
  iconURL?: string;
  precio_contado?: number;
  precio_tarjeta?: number;
  stock_total?: number;
  talles?: Array<{talle: string, stock: number}>;
  fecha_ultima_venta?: firebase.firestore.Timestamp;
  fecha_ultima_modificacion?: firebase.firestore.Timestamp;
  fecha_ingreso?: firebase.firestore.Timestamp;
}
