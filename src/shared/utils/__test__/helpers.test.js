import { MAX_HORSE_CONDITION, MIN_HORSE_CONDITION, PAGE_TITLE } from '../constants';
import { getRandomCondition, secondsToHHMMSS, setPageTitle } from '../helpers.js';

describe('helpers.js', () => {
  describe('setPageTitle', () => {
    const originalTitle = document.title;
    afterEach(() => {
      document.title = originalTitle;
    });

    it('sets document.title to PAGE_TITLE if no meta.title', () => {
      setPageTitle({});
      expect(document.title).toBe(PAGE_TITLE);
    });

    it('sets document.title to PAGE_TITLE - meta.title if meta.title exists', () => {
      setPageTitle({ meta: { title: 'Test' } });
      expect(document.title).toBe(`${PAGE_TITLE} - Test`);
    });

    it('sets document.title to PAGE_TITLE if input is undefined', () => {
      setPageTitle();
      expect(document.title).toBe(PAGE_TITLE);
    });
  });

  describe('secondsToHHMMSS', () => {
    it('formats 0 seconds as 00:00:00', () => {
      expect(secondsToHHMMSS(0)).toBe('00:00:00');
    });

    it('formats 3661 seconds as 01:01:01', () => {
      expect(secondsToHHMMSS(3661)).toBe('01:01:01');
    });

    it('formats 59 seconds as 00:00:59', () => {
      expect(secondsToHHMMSS(59)).toBe('00:00:59');
    });

    it('formats 3600 seconds as 01:00:00', () => {
      expect(secondsToHHMMSS(3600)).toBe('01:00:00');
    });
  });

  describe('getRandomCondition', () => {
    it('returns a number between MIN_HORSE_CONDITION and MAX_HORSE_CONDITION', () => {
      for (let i = 0; i < 100; i++) {
        const val = getRandomCondition();
        expect(val).toBeGreaterThanOrEqual(MIN_HORSE_CONDITION);
        expect(val).toBeLessThanOrEqual(MAX_HORSE_CONDITION);
      }
    });

    it('returns an integer', () => {
      const val = getRandomCondition();
      expect(Number.isInteger(val)).toBe(true);
    });
  });
});
