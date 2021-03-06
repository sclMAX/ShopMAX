export interface ClienteInterface {
  id?: string;
  nombre?: string;
  nombre_lowercase?: string;
  dni?: number;
  email?: string;
  direccion?: string;
  telefono_movil?: string;
  telefono_fijo?: string;
  limite_credito?: number;
  fecha_ingreso?: firebase.firestore.Timestamp;
  fecha_ultima_compra?: firebase.firestore.Timestamp;
  comentarios?: string;
}
