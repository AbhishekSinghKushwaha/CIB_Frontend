import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BankModel, CountryModel } from "../../domain/bank.model";
import { FromAccount } from "../../domain/transfer.models";
import { StateService } from "../state/state.service";

interface SharedDataState {
  banks: BankModel[];
  countries: CountryModel[];
  userAccounts: FromAccount[];
}

const initialSharedDataState: SharedDataState = {
  banks: [],
  countries: [],
  userAccounts: [],
};

@Injectable({
  providedIn: "root",
})
export class SharedDataService extends StateService<SharedDataState> {
  banks$: Observable<BankModel[]> = this.select((state) => state.banks);
  countries$: Observable<CountryModel[]> = this.select(
    (state) => state.countries
  );
  userAccounts$: Observable<FromAccount[]> = this.select(
    (state) => state.userAccounts
  );
  constructor() {
    super(initialSharedDataState);
  }

  setBanks(banks: BankModel[]) {
    this.setState({ banks });
  }

  setUserAccounts(userAccounts: FromAccount[]) {
    this.setState({ userAccounts });
  }

  // setSubsidiaries(countries: CountryModel[]) {
  //   this.countries.next(countries);
  // }

  setCountries(countries: CountryModel[]) {
    this.setState({ countries });
  }
}
