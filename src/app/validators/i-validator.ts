import { ValidatorFn } from "@angular/forms";

export interface IValidator {
  getValidatorFn: () => ValidatorFn;
}
