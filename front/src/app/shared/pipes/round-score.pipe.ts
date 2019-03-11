import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundScore'
})
export class RoundScorePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Math.round(value * 100) / 100;
  }

}
