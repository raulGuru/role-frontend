import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';


export class CustomValidators {
  static atLeastOneValue(control: AbstractControl): ValidationErrors {
    return Object.keys(control.value).some((key) => !!control.value[key])
      ? null
      : { atLeastOneValue: 'At least one field is required!!' };
  }

  static MustMatch(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('newpassword').value;
    let confirmPass = group.get('confirmpassword').value;

    return pass === confirmPass ? null : { notSame: true }     
  }
}
