import {Component, OnInit} from '@angular/core';
import {CommaExerciseService} from "./comma-exercise.service";
import {EXAMPLE_TASKS} from "../../global";

@Component({
  selector: 'app-comma-exercise',
  templateUrl: './comma-exercise.component.html',
  styleUrls: ['./comma-exercise.component.scss']
})
export class CommaExerciseComponent implements OnInit {

  chars: string[] = [];
  hoverCharIndex = -1;
  currentTaskIdx = 0;
  tasks = EXAMPLE_TASKS; // TODO

  private commaExerciseService = new CommaExerciseService();

  constructor() {}

  ngOnInit(): void {
    this.loadCurrentTask();
  }

  private loadCurrentTask() {
    const withoutComma = this.commaExerciseService.getSentenceWithoutComma(this.tasks[this.currentTaskIdx]);
    this.chars = withoutComma.split('');
  }

  check() {
    const solution = this.tasks[this.currentTaskIdx];
    const userInput = this.chars.join();
    const result = this.commaExerciseService.solve(userInput, solution);
    console.log(result);
  }

  onCharClick(charSpan: HTMLSpanElement, index: number) {
    const char = charSpan.textContent;
    const previousChar = this.chars[index - 1];
    const nextChar = this.chars[index + 1];
    if (char === ',') {
      this.chars.splice(index, 1);
    } else if (char === ' ' && previousChar !== ',') {
      this.chars.splice(index, 0, ',');
      this.hoverCharIndex = -1;
    } else if (nextChar === ' ') {
      this.chars.splice(index + 1, 0, ',');
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
