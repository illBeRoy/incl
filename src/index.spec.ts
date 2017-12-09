import { Chance } from 'chance';
import * as nock from 'nock';
import { include } from '.';


describe('include(url)', () => {

  const validUrl = Chance().url();
  const invalidUrl = Chance().url();

  beforeAll(() =>
    nock(validUrl)
      .get('')
      .reply(200));

  describe('upon invocation', () => {

    it('should load given url into script tag', async () => {

      await include(validUrl);

      expect(document.querySelectorAll(`script[src="${validUrl}"]`).length).toEqual(1);
    });

    it('should not load a given url more than once', async () => {

      await include(validUrl);
      await include(validUrl);
      await include(validUrl);

      expect(document.querySelectorAll(`script[src="${validUrl}"]`).length).toEqual(1);
    });

  });

  describe('returned promise', () => {

    it('should resolve with nothing if script was loaded successfully', () =>
      expect(include(validUrl))
        .resolves
        .toBeUndefined());

    it('should reject with error if script was not loaded successfully', () =>
      expect(include(invalidUrl))
        .rejects
        .toBeDefined());

  });

});