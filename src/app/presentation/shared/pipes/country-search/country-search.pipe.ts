import { Pipe, PipeTransform } from "@angular/core";
import { CountryModel } from "src/app/core/domain/bank.model";

@Pipe({
  name: "countrySearch",
})
export class CountrySearchPipe implements PipeTransform {
  transform(value: CountryModel[], searchValue: string): any {
    if (!searchValue) return value;

    return value.filter(
      (v) =>
        v?.countryName?.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        v?.countryCode3Chars?.toLowerCase().indexOf(searchValue.toLowerCase()) >
          -1 ||
        v?.countryCode?.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
