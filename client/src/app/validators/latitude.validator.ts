import {AbstractControl} from '@angular/forms';

export class LatitudeValidator {

  public static validate(c:AbstractControl) {
    let LATITUDE_REGEXP = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;

    return LATITUDE_REGEXP.test(c.value) ? null : {
      validateLatitude: {
        valid: false
      }
    };
  }
}
