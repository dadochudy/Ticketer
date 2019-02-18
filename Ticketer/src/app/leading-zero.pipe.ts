import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZero'
})
export class LeadingZeroPipe implements PipeTransform {

  transform(value: number, digitNumber: number): string {

    if (value < digitNumber ) {
      return '0' + value;
    }

    return '' + value;
  }

}
