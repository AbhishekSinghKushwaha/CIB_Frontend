import { Component, OnInit } from '@angular/core';
import { VirtualAccountConstants } from 'src/app/core/utils/constants/virtual-account.constants';
import SharedUtil from './../../../../../core/utils/shared.util';

@Component({
  selector: 'app-virtual-account',
  templateUrl: './virtual-account.component.html',
  styleUrls: ['./virtual-account.component.scss']
})
export class VirtualAccountComponent implements OnInit {

  data: any;

  constructor(private readonly virtualAccountConstants: VirtualAccountConstants) {
    this.data = virtualAccountConstants.DASHBOARD_LIST;
  }

  ngOnInit(): void {
  }

}
