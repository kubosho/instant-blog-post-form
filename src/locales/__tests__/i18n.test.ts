import { expect, test } from 'vitest';
import { activateI18n, retrieveTranslation, setLocale } from '../i18n';

test('i18n', () => {
  activateI18n();
  setLocale('ja');

  const actual = retrieveTranslation('draft');

  expect(actual).toBe('下書きにする');
});
