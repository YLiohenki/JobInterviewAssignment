import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "noyes" })
export class NoYesPipe implements PipeTransform {
  transform(value: boolean): string {
    return value === true ? "yes" : "no";
  }
}
