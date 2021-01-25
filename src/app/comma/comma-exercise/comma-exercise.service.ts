export class CommaExerciseService {

  constructor() {
  }

  getSentenceWithoutComma(sentence: string): string {
    return sentence.replace(/,/g, '');
  }

  getSentenceWithoutWhiteSpaceAfterComma(sentence: string): string {
    const split = sentence.split(',');
    const withoutWhiteSpace: string[] = [];
    split.forEach(s => withoutWhiteSpace.push(s.trim()));
    return withoutWhiteSpace.join(',');
  }

  solve(userInput: string, solution: string): CommaExerciseResult {
    const correct = [];
    const errors = [];
    let hint: string;

    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === ',' && userInput[i] === ',') {
        correct.push(i);
      } else if (solution[i] === ',' && userInput[i] === ' ' || solution[i] === ' ' && userInput[i] === ',') {
        errors.push(i);
      }
    }

    if (errors.length === 0) {
      hint = 'Richtig';
    } else {
      hint = 'Leider nicht korrekt';
    }

    return {correct, errors, hint}
  }
}

export interface CommaExerciseResult {
  correct: number[],
  errors: number[],
  hint: string
}
