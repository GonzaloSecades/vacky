const APP_URL_ENV_KEYS = ['VACKY_APP_URL', 'NEXT_PUBLIC_APP_URL', 'APP_URL'] as const;

function normalizeUrl(rawUrl: string) {
  return rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
}

export function getAppBaseUrl() {
  for (const key of APP_URL_ENV_KEYS) {
    const value = process.env[key]?.trim();

    if (value) {
      return normalizeUrl(value);
    }
  }

  return 'http://localhost:3001';
}

