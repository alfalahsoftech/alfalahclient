
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchByName' })
export  class SearchByNamePipe implements PipeTransform {

  transform(array: any[], searchText: string) {
    if(array!=undefined)
        return array.filter(obj => obj.mediName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

  }
}