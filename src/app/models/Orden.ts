export interface OrdenVentaInterface {
    id?: string;
    fecha?: firebase.firestore.Timestamp;
    id_cliente?: string;
    comentarios?: string;
    total?: number;
    items?: OrdenVentaItemInteface[];
    tipo_venta?: string;
    procesado?: boolean;
}

export interface OrdenVentaItemInteface {
    cantidad?: number;
    id_articulo?: string;
    talle?: string;
    descuento?: number;
    precio?: number;
}

