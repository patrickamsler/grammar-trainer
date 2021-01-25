import {CommaExerciseService} from './comma-exercise.service';

describe('CommaExerciseService', () => {
  const uut = new CommaExerciseService();

  beforeEach(() => {

  });

  describe('getSentenceWithoutComma', () => {
    it('should remove all commas ', () => {
      const sentence = 'Sie wirkte ruhig, gelassen, entspannt.';
      const sentenceWithoutComma = uut.getSentenceWithoutComma(sentence);
      expect(sentenceWithoutComma).toEqual('Sie wirkte ruhig gelassen entspannt.')
    });
  });

  describe('getSentenceWithoutWhiteSpaceAfterComma', () => {
    it('should remove all whitespace after comma ', () => {
      const sentence = 'Sie wirkte ruhig, gelassen, entspannt.';
      const withoutWhiteSpace = uut.getSentenceWithoutWhiteSpaceAfterComma(sentence);
      expect(withoutWhiteSpace).toEqual('Sie wirkte ruhig,gelassen,entspannt.')
    });
    it('should remove multiple whitespace after and before comma ', () => {
      const sentence = 'Sie sagte,  sie komme gleich wieder , und ging hinaus.';
      const withoutWhiteSpace = uut.getSentenceWithoutWhiteSpaceAfterComma(sentence);
      expect(withoutWhiteSpace).toEqual('Sie sagte,sie komme gleich wieder,und ging hinaus.')
    });
    it('should not remove whitespace if there is no comma ', () => {
      const sentence = 'Er geht einkaufen.';
      const withoutWhiteSpace = uut.getSentenceWithoutWhiteSpaceAfterComma(sentence);
      expect(withoutWhiteSpace).toEqual('Er geht einkaufen.')
    });
  });

  describe('solve', () => {
    it('returns no errors', () => {
      const userInput = 'Sie wirkte ruhig,gelassen,entspannt.';
      const solution = 'Sie wirkte ruhig,gelassen,entspannt.';

      const result = uut.solve(userInput, solution);

      expect(result.errors.length).toEqual(0);
      expect(result.correct).toEqual([16, 25]);
    });
    it('returns errors', () => {
      const userInput = 'Sie wirkte ruhig,gelassen,entspannt.';
      const solution = 'Sie wirkte ruhig gelassen entspannt.';

      const result = uut.solve(userInput, solution);

      expect(result.correct.length).toEqual(0);
      expect(result.errors).toEqual([16, 25]);
    });
    it('returns errors and correct results', () => {
      const userInput = 'Sie wirkte ruhig,gelassen,entspannt.';
      const solution = 'Sie,wirkte ruhig gelassen,entspannt.';

      const result = uut.solve(userInput, solution);

      expect(result.correct).toEqual([25]);
      expect(result.errors).toEqual([3, 16]);
    });
  });
});
