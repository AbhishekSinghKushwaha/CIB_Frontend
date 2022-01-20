import { Component, OnInit } from '@angular/core';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-company-directors',
  templateUrl: './company-directors.component.html',
  styleUrls: ['./company-directors.component.scss']
})
export class CompanyDirectorsComponent implements OnInit {
  directors = [1, 2, 3, 4]

  constructor() { }

  ngOnInit(): void {
  }

  @confirmModal({
    title: 'Are you sure',
    message: 'Once you remove a director, all their details will be deleted. You can add them again anytime.',
    cancelText: 'No, I\'m not',
    confirmText: 'Yes, I\'m sure'
  })
  delete() {
    this.directors.pop()
  }

}
