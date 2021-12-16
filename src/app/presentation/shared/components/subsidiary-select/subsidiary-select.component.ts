import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { SubsidiaryModel } from 'src/app/core/domain/bank.model';
import { CountryModel } from 'src/app/core/domain/country.model';
import { CountryService } from 'src/app/core/services/country/country.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';

@Component({
  selector: 'app-subsidiary-select',
  templateUrl: './subsidiary-select.component.html',
  styleUrls: ['./subsidiary-select.component.scss'],
})
export class SubsidiarySelectComponent implements OnInit {
  visibility = true;
  subsidiaries: SubsidiaryModel[];
  viewTypes = countrySettings.viewTypes;
  subscriptions: Subscription[] = [];
  @Input() category: string;
  @Output() selected = new Subject<SubsidiaryModel>();
  constructor(
    private sharedDataService: SharedDataService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.subsidiaries.subscribe((res) => {
      console.log(res);
      this.subsidiaries = res;
    });
  }

  openSubsidiaries(): void {
    this.visibility = false;
    const modal = this.countryService.openSubsidiary(
      this.subsidiaries,
      this.category
    );
    this.subscriptions.push(
      modal.afterClosed().subscribe((data: SubsidiaryModel) => {
        this.countryService.openedStatus.next(false);
        this.visibility = true;
        this.selected.next(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.length &&
      this.subscriptions.forEach((value) => value && value.unsubscribe());
  }
}
