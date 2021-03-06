import {Component, OnInit} from '@angular/core';
import {CommaExerciseHelper, CommaExerciseResult} from "./comma-exercise-helper";
import {EXAMPLE_QUESTIONS} from "../../global";

enum CommaExerciseStatus {
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
  charErrorIdx: number[] = [];
  charCorrectIdx: number[] = [];
  currentQuestionIdx = -1;
  questions = EXAMPLE_QUESTIONS; // TODO
  hint = '';

  private commaExerciseStatus = CommaExerciseStatus.QUESTION_IN_PROGRESS;
  private numOfIncorrectAnswers = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadNextQuestion();
  }

  private loadNextQuestion() {
    this.currentQuestionIdx++;
    const withoutComma = CommaExerciseHelper.getSentenceWithoutComma(this.questions[this.currentQuestionIdx]);
    this.chars = withoutComma.split('');
    this.commaExerciseStatus = CommaExerciseStatus.QUESTION_IN_PROGRESS;
    this.hint = '';
    this.numOfIncorrectAnswers = 0;
    this.charErrorIdx = [];
    this.charCorrectIdx = [];
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

  private checkUserInput() :CommaExerciseResult  {
    const currentQuestion = this.questions[this.currentQuestionIdx];
    const solution = CommaExerciseHelper.getSentenceWithoutWhiteSpaceAfterComma(currentQuestion);
    const userInput = this.chars.join('');
    const result = CommaExerciseHelper.solve(userInput, solution);

    if (result.errors.length === 0) {
      if (this.currentQuestionIdx === this.questions.length - 1) {
        this.commaExerciseStatus = CommaExerciseStatus.EXERCISE_FINISHED;
      } else {
        this.commaExerciseStatus = CommaExerciseStatus.QUESTION_FINISHED;
      }
      this.hint = 'Richtig'; // TODO add icon
    } else {
      this.commaExerciseStatus = CommaExerciseStatus.QUESTION_ERROR;
      this.numOfIncorrectAnswers++;
      if (this.numOfIncorrectAnswers > 1) {
        this.hint = result.hint;
      } else {
        this.hint = 'Die Lösung enthält Fehler.';
      }
    }

    return result;
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

  showSolutionClick() {
    const result = this.checkUserInput();
    this.charErrorIdx = result.errors;
    this.charCorrectIdx = result.correct;

    if (this.currentQuestionIdx === this.questions.length - 1) {
      this.commaExerciseStatus = CommaExerciseStatus.EXERCISE_FINISHED;
    } else {
      this.commaExerciseStatus = CommaExerciseStatus.QUESTION_FINISHED;
    }
  }

  isSolutionButtonVisible() {
    return this.numOfIncorrectAnswers >= 3;
  }

  onCharClick(charSpan: HTMLSpanElement, index: number) {
    const char = charSpan.textContent;
    const nextChar = this.chars[index + 1];
    if (char === ',') {
      this.chars.splice(index, 1, ' ');
    } else if (char === ' ') {
      this.chars.splice(index, 1, ',');
    } else if (nextChar === ' ') {
      this.chars.splice(index + 1, 1, ',');
    }
  }
}
