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
  commaExerciseStatus = CommaExerciseStatus.QUESTION_IN_PROGRESS;
  primaryButtonText = 'Prüfen';

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
    this.primaryButtonText = 'Prüfen';
  }

  check() {
    if (this.commaExerciseStatus === CommaExerciseStatus.QUESTION_FINISHED) {
      this.loadNextQuestion();
      return;
    }

    const currentQuestion = this.questions[this.currentQuestionIdx];
    const solution = this.commaExerciseService.getSentenceWithoutWhiteSpaceAfterComma(currentQuestion);
    const userInput = this.chars.join('');
    const result = this.commaExerciseService.solve(userInput, solution);

    if (result.errors.length === 0) {
      this.commaExerciseStatus = CommaExerciseStatus.QUESTION_FINISHED;
      this.primaryButtonText = 'Nächste Frage';
    } else {
      this.commaExerciseStatus = CommaExerciseStatus.QUESTION_ERROR;
    }
  }

  onCharClick(charSpan: HTMLSpanElement, index: number) {
    const char = charSpan.textContent;
    const previousChar = this.chars[index - 1];
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
