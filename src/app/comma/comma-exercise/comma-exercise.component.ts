import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-comma-exercise',
  templateUrl: './comma-exercise.component.html',
  styleUrls: ['./comma-exercise.component.scss']
})
export class CommaExerciseComponent implements OnInit {

  chars: string[];
  hoverCharIndex = -1;

  constructor() {
    this.chars = "Wir danken Ihnen, dass Sie uns die Malerarbeiten anvertraut haben, und hoffen, dass Sie mit unserer Arbeit hundert Prozent zufrieden sind und wir wieder einmal für Sie tätig sein dürfen.".split('')
  }

  ngOnInit(): void {

  }

  check() {
    console.log('check');
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
