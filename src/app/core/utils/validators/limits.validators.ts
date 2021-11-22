import {AbstractControl} from '@angular/forms';

export function accountLimitValidator(control: AbstractControl) {
    if (!control.value.isWithinLimit) {
         return {isWithinLimit: false}
    }
   return null
}