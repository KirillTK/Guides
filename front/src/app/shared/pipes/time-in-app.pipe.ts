import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeInApp'
})
export class TimeInAppPipe implements PipeTransform {

  transform(time: string, args?: any): any {
    const _time = moment(time, 'MMMM Do YYYY');
    return moment(new Date(), 'MMMM Do YYYY').diff(_time, 'days');
  }

}
