import {Component, OnInit} from '@angular/core';
import {CommaExerciseService} from "./comma-exercise.service";
import {EXAMPLE_TASKS} from "../../global";

export enum CommaExerciseStatus {
  TASK_IN_PROGRESS,
  TASK_ERROR,
  TASK_FINISHED,
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
  currentTaskIdx = -1;
  tasks = EXAMPLE_TASKS; // TODO
  commaExerciseStatus = CommaExerciseStatus.TASK_IN_PROGRESS;
  primaryButtonText = 'Prüfen';

  private commaExerciseService = new CommaExerciseService();

  constructor() {}

  ngOnInit(): void {
    this.loadNextTask();
  }

  private loadNextTask() {
    this.currentTaskIdx++;
    const withoutComma = this.commaExerciseService.getSentenceWithoutComma(this.tasks[this.currentTaskIdx]);
    this.chars = withoutComma.split('');
    this.commaExerciseStatus = CommaExerciseStatus.TASK_IN_PROGRESS;
    this.primaryButtonText = 'Prüfen';
  }

  check() {
    if (this.commaExerciseStatus === CommaExerciseStatus.TASK_FINISHED) {
      this.loadNextTask();
      return;
    }

    const currentTask = this.tasks[this.currentTaskIdx];
    const solution = this.commaExerciseService.getSentenceWithoutWhiteSpaceAfterComma(currentTask);
    const userInput = this.chars.join('');
    const result = this.commaExerciseService.solve(userInput, solution);

    if (result.errors.length === 0) {
      this.commaExerciseStatus = CommaExerciseStatus.TASK_FINISHED;
      this.primaryButtonText = 'Nächste Frage';
    } else {
      this.commaExerciseStatus = CommaExerciseStatus.TASK_ERROR;
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
