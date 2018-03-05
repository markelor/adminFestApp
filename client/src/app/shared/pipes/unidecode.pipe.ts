import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidecode'
})
export class UnidecodePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

}
