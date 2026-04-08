export const THEME_COOKIE_NAME = 'theme';
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type Theme = 'light' | 'dark';

export function isTheme(value: string | null | undefined): value is Theme {
  return value === 'light' || value === 'dark';
}

export function resolveTheme(value: string | null | undefined): Theme {
  return isTheme(value) ? value : 'light';
}
