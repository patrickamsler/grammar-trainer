import {CommaExerciseHelper} from './comma-exercise-helper';

describe('CommaExerciseService', () => {

  beforeEach(() => {

  });

  describe('getSentenceWithoutComma', () => {
    it('should remove all commas ', () => {
      const sentence = 'Sie wirkte ruhig, gelassen, entspannt.';
      const sentenceWithoutComma = CommaExerciseHelper.getSentenceWithoutComma(sentence);
      expect(sentenceWithoutComma).toEqual('Sie wirkte ruhig gelassen entspannt.')
    });
  });

  describe('getSentenceWithoutWhiteSpaceAfterComma', () => {
    it('should remove all whitespace after comma ', () => {
      const sentence = 'Sie wirkte ruhig, gelassen, entspannt.';
      const withoutWhiteSpace = CommaExerciseHelper.getSentenceWithoutWhiteSpaceAfterComma(sentence);
      expect(withoutWhiteSpace).toEqual('Sie wirkte ruhig,gelassen,entspannt.')
    });
    it('should remove multiple whitespace after and before comma ', () => {
      const sentence = 'Sie sagte,  sie komme gleich wieder , und ging hinaus.';
      const withoutWhiteSpace = CommaExerciseHelper.getSentenceWithoutWhiteSpaceAfterComma(sentence);
      expect(withoutWhiteSpace).toEqual('Sie sagte,sie komme gleich wieder,und ging hinaus.')
    });
    it('should not remove whitespace if there is no comma ', () => {
      const sentence = 'Er geht einkaufen.';
      const withoutWhiteSpace = CommaExerciseHelper.getSentenceWithoutWhiteSpaceAfterComma(sentence);
      expect(withoutWhiteSpace).toEqual('Er geht einkaufen.')
    });
  });

  describe('solve', () => {
    it('returns no errors', () => {
      const userInput = 'Sie wirkte ruhig,gelassen,entspannt.';
      const solution = 'Sie wirkte ruhig,gelassen,entspannt.';

      const result = CommaExerciseHelper.solve(userInput, solution);

      expect(result.errors.length).toEqual(0);
      expect(result.correct).toEqual([16, 25]);
      expect(result.hint).toEqual('');
    });
    it('returns errors if no comma is set', () => {
      const userInput = 'Sie wirkte ruhig gelassen entspannt.';
      const solution = 'Sie wirkte ruhig,gelassen,entspannt.';

      const result = CommaExerciseHelper.solve(userInput, solution);

      expect(result.correct.length).toEqual(0);
      expect(result.errors).toEqual([16, 25]);
      expect(result.hint).toEqual('Du hast 0 Kommas gesetzt, aber es sind 2 Kommas nötig.');
    });
    it('returns errors of more commas are set the necessary', () => {
      const userInput = 'Sie wirkte,ruhig,gelassen,entspannt.';
      const solution = 'Sie wirkte ruhig,gelassen,entspannt.';

      const result = CommaExerciseHelper.solve(userInput, solution);

      expect(result.correct).toEqual([16, 25]);
      expect(result.errors).toEqual([10]);
      expect(result.hint).toEqual('Du hast 3 Kommas gesetzt, nötig wären aber nur 2 Kommas.');
    });
    it('returns errors and correct results', () => {
      const userInput = 'Sie,wirkte ruhig gelassen,entspannt.';
      const solution = 'Sie wirkte ruhig,gelassen,entspannt.';

      const result = CommaExerciseHelper.solve(userInput, solution);

      expect(result.correct).toEqual([25]);
      expect(result.errors).toEqual([3, 16]);
      expect(result.hint).toEqual('Die Anzahl der Kommas ist korrekt, aber die Positionen stimmen nicht.');
    });
  });
});
