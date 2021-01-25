import {Component, OnInit} from '@angular/core';
import {CommaExerciseService} from "./comma-exercise.service";
import {EXAMPLE_QUESTIONS} from "../../global";

export enum CommaExerciseStatus {
  QUESTION_IN_PROGRESS,
  QUESTION_ERROR,
  QUESTION_FINISHED,
  EXERCISE_FINISHED
}

@Component({
  selector: 'app-comma-exercise',
  templateUrl: './comma-exercise.component.html',
  styleUrls: ['./comma-exercise.component.scss']
})
export class CommaExerciseComponent implements OnInit {

  chars: string[] = [];
  hoverCharIndex = -1;
  currentQuestionIdx = -1;
  questions = EXAMPLE_QUESTIONS; // TODO
  hint = '';

  private commaExerciseStatus = CommaExerciseStatus.QUESTION_IN_PROGRESS;
  private commaExerciseService = new CommaExerciseService();

  constructor() {}

  ngOnInit(): void {
    this.loadNextQuestion();
  }

  private loadNextQuestion() {
    this.currentQuestionIdx++;
    const withoutComma = this.commaExerciseService.getSentenceWithoutComma(this.questions[this.currentQuestionIdx]);
    this.chars = withoutComma.split('');
    this.commaExerciseStatus = CommaExerciseStatus.QUESTION_IN_PROGRESS;
    this.hint = '';
  }

  primaryButtonClick() {
    if (this.commaExerciseStatus === CommaExerciseStatus.QUESTION_FINISHED) {
      this.loadNextQuestion();
    } else if (this.commaExerciseStatus === CommaExerciseStatus.EXERCISE_FINISHED) {
      // TODO show summary
    } else {
      this.checkUserInput();
    }
  }

  private checkUserInput() {
    const currentQuestion = this.questions[this.currentQuestionIdx];
    const solution = this.commaExerciseService.getSentenceWithoutWhiteSpaceAfterComma(currentQuestion);
    const userInput = this.chars.join('');
    const result = this.commaExerciseService.solve(userInput, solution);
    this.hint = result.hint;

    if (result.errors.length === 0) {
      if (this.currentQuestionIdx === this.questions.length - 1) {
        this.commaExerciseStatus = CommaExerciseStatus.EXERCISE_FINISHED;
      } else {
        this.commaExerciseStatus = CommaExerciseStatus.QUESTION_FINISHED;
      }
    } else {
      this.commaExerciseStatus = CommaExerciseStatus.QUESTION_ERROR;
    }
  }

  getPrimaryButtonText() {
    switch (this.commaExerciseStatus) {
      case CommaExerciseStatus.QUESTION_IN_PROGRESS:
        return 'Prüfen';
      case CommaExerciseStatus.QUESTION_ERROR:
        return 'Prüfen';
      case CommaExerciseStatus.QUESTION_FINISHED:
        return 'Nächste Frage';
      case CommaExerciseStatus.EXERCISE_FINISHED:
        return 'Aufgabe beenden';
    }
  }

  onCharClick(charSpan: HTMLSpanElement, index: number) {
    const char = charSpan.textContent;
    const nextChar = this.chars[index + 1];
    if (char === ',') {
      this.chars.splice(index, 1, ' ');
    } else if (char === ' ') {
      this.chars.splice(index, 1, ',');
      this.hoverCharIndex = -1;
    } else if (nextChar === ' ') {
      this.chars.splice(index + 1, 1, ',');
      this.hoverCharIndex = -1;
    }
  }

  onCharMouseOver(charSpan: HTMLSpanElement, index: number) {
    const char = charSpan.textContent;
    if (char === ' ' && this.chars[index - 1] !== ',' || char === ',') {
      this.hoverCharIndex = index
    }
  }

  onCharMouseLeave(charSpan: HTMLSpanElement, index: number) {
    this.hoverCharIndex = -1;
  }
}
