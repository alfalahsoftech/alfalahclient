import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'searchData' })
export class startsWithPipe implements PipeTransform {
    transform(value: any[], term: string): any[] {
        return value.filter((x: any) => x.mediName.toLowerCase().startsWith(term.toLowerCase()));

    }
}
