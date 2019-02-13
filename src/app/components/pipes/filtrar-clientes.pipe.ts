import {Pipe, PipeTransform} from '@angular/core';
import {ClienteInterface} from 'src/app/models/Cliente';

@Pipe({name: 'filtrarClientes'})
export class FiltrarClientesPipe implements PipeTransform {
  transform(value: ClienteInterface[], filtro: string): ClienteInterface[] {
    if (filtro && filtro.length > 2) {
      filtro = filtro.toLowerCase();
      return value.filter(
          cliente =>
              (cliente.nombre.toLowerCase().indexOf(filtro) > -1) ||
              (cliente.dni && String(cliente.dni).indexOf(filtro) > -1) ||
              (cliente.direccion &&
               cliente.direccion.toLowerCase().indexOf(filtro) > -1));
    }
    return value;
  }
}
