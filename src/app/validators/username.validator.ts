import { ValidatorFn, AbstractControl } from "@angular/forms";
import { IValidator } from "./i-validator";
import { VALIDATION_ERROR_CODES } from "src/model/shared/tokens";

export class UsernameValidator implements IValidator {
  public getValidatorFn(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let correctUsername =
        typeof control.value === "string" &&
        control.value.toLowerCase() === "bob";
      return correctUsername
        ? null
        : {
            [VALIDATION_ERROR_CODES.incorrectUsername]: { value: control.value }
          };
    };
  }
}
