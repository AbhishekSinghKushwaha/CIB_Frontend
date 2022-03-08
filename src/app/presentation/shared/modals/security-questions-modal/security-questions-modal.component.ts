import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityQuestionModel } from 'src/app/core/domain/security-question.model';
import { SecurityChallengeService } from 'src/app/core/services/security-challenge/security-challenge.service';

@Component({
  selector: 'app-security-questions-modal',
  templateUrl: './security-questions-modal.component.html',
  styleUrls: ['./security-questions-modal.component.scss']
})
export class SecurityQuestionsModalComponent implements OnInit {
  selected: SecurityQuestionModel[];
  clicked: SecurityQuestionModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public questions: { allQuestions: SecurityQuestionModel[], displayedQuestions: SecurityQuestionModel[], toUpdate: SecurityQuestionModel },
    private readonly securityChallengeService: SecurityChallengeService) { }

  ngOnInit(): void {
  }

  close(selected: SecurityQuestionModel[] = []) {
    this.securityChallengeService.close(selected);
  }

  onSelect(clicked: SecurityQuestionModel) {
    const alreadySelected = this.questions.displayedQuestions.some(x => x.id === clicked.id);
    if (!alreadySelected) {
      const newDisplayedQuestions = this.questions.displayedQuestions.map(x => {
        if (this.questions.toUpdate.id === x.id) {
          return clicked;
        }
        return x;
      })
      this.clicked = clicked;
      this.close(newDisplayedQuestions);
    }
  }

  isSelected(selected: SecurityQuestionModel): boolean {
    return this.questions.displayedQuestions.some(x => x.id === selected.id)
  }

}
