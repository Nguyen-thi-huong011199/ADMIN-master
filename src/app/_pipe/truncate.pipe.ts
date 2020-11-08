import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TrucatePipe implements PipeTransform {
    transform(text: string, limit: number) {
        if(text.length > limit) {
            return text.substr(0, limit) + "...";
        }
        return text;
    }
}
