import { Chance } from 'chance';
import * as nock from 'nock';
import { include } from '.';


describe('include(url)', () => {

  const validUrl = Chance().url();
  const validCssUrl = `${Chance().url()}/${Chance().word()}.css`;
  const invalidUrl = Chance().url();

  beforeAll(() => {

    nock(validUrl)
      .get('')
      .reply(200);

    nock(validCssUrl)
      .get('')
      .reply(200)
  });

  describe('upon invocation', () => {

    it('should load given url into script tag by default', async () => {

      await include(validUrl);

      expect(document.querySelectorAll(`script[src="${validUrl}"]`).length).toEqual(1);
    });

    it('should load given url into link tag if is css', async () => {

      await include(validCssUrl);

      expect(document.querySelectorAll(`link[rel="stylesheet"][href="${validCssUrl}"]`).length).toEqual(1);
    });

    it('should not load a given url more than once', async () => {

      const someValidUrl = Chance().pickone([validUrl, validCssUrl]);

      await include(someValidUrl);
      await include(someValidUrl);
      await include(someValidUrl);

      expect(document.querySelectorAll(`script[src="${someValidUrl}"], link[href="${someValidUrl}"]`).length)
        .toEqual(1);
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