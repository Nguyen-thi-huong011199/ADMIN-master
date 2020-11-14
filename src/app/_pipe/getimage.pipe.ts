import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment'

@Pipe({ name: 'getImage' })
export class GetImagePipe implements PipeTransform {
    transform(name: string, type: number = 0) {
        return environment.imageUrl + name;
    }
}
