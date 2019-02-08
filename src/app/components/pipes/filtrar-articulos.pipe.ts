import {ArticuloInterface} from './../../models/Articulo';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filtrarArticulos'})
export class FiltrarArticulosPipe implements PipeTransform {
  transform(value: ArticuloInterface[], search: string): ArticuloInterface[] {
    if (search && search.length > 2) {
      const st = search.toLowerCase();
      return value.filter(
          item => (item.nombre.toLowerCase().indexOf(st) > -1) ||
                  (item.descripcion.toLowerCase().indexOf(st) > -1));
    }
    return value;
  }
}
