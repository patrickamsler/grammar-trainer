export class CommaExerciseHelper {

  constructor() {
  }

  static getSentenceWithoutComma(sentence: string): string {
    return sentence.replace(/,/g, '');
  }

  static getSentenceWithoutWhiteSpaceAfterComma(sentence: string): string {
    const split = sentence.split(',');
    const withoutWhiteSpace: string[] = [];
    split.forEach(s => withoutWhiteSpace.push(s.trim()));
    return withoutWhiteSpace.join(',');
  }

  static solve(userInput: string, solution: string): CommaExerciseResult {
    const correct = [];
    const errors = [];
    let hint = '';

    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === ',' && userInput[i] === ',') {
        correct.push(i);
      } else if (solution[i] === ',' && userInput[i] === ' ' || solution[i] === ' ' && userInput[i] === ',') {
        errors.push(i);
      }
    }

    if (errors.length > 0) {
      hint = this.getHint(userInput, solution);
    }

    return {correct, errors, hint}
  }

  private static getHint(userInput: string, solution: string) :string {
    const commasCorrect = (solution.match(/,/g)||[]).length;
    const commasSet = (userInput.match(/,/g)||[]).length;

    if (commasCorrect === 0 && commasSet > 0) {
      return 'Kein Komma ohne Grund.';
    } else if (commasSet < commasCorrect) {
      return `Du hast ${commasSet} Kommas gesetzt, aber es sind ${commasCorrect} Kommas nötig.`;
    } else if (commasSet > commasCorrect) {
      return `Du hast ${commasSet} Kommas gesetzt, nötig wären aber nur ${commasCorrect} Kommas.`;
    } else {
      return `Die Anzahl der Kommas ist korrekt, aber die Positionen stimmen nicht.`;
    }
  }
}

export interface CommaExerciseResult {
  correct: number[],
  errors: number[],
  hint: string
}
