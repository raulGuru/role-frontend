import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static atLeastOneValue(control: AbstractControl): ValidationErrors {
    return Object.keys(control.value).some((key) => !!control.value[key])
      ? null
      : { atLeastOneValue: 'At least one field is required!!' };
  }
}
