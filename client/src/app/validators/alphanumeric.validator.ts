import {AbstractControl} from '@angular/forms';

export class AlphanumericValidator {

  public static validate(c:AbstractControl) {
    let ALPHANUMERIC_REGEXP = /^[A-Za-z\d\s]+$/;

    return ALPHANUMERIC_REGEXP.test(c.value) ? null : {
      validateAlphanumeric: {
        valid: false
      }
    };
  }
}
