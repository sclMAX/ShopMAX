export interface IdentificationTypeInterface {
  id?: string;          // Identificador de tipo de identificación.
  name?: string;        // Nombre de tipo de identificación.
  type?: string;        // Tipo de dato del número de identificación.
  min_length?: number;  // Mínima longitud del número de identificación.
  max_length?: number;  // Máxima longitud del número de identificación.
}
