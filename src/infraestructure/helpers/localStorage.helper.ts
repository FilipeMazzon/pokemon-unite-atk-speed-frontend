import LocalStorageEnum from '../enums/localStorage.enum';

export const getToken = (): string | null => window
  .localStorage
  .getItem(LocalStorageEnum.auth0token);

export const setToken = (newToken: string): void => {
  window.localStorage.setItem(LocalStorageEnum.auth0token, newToken);
};

export const getTokenTTL = (): string | null => window
  .localStorage
  .getItem(LocalStorageEnum.tokenTTL);

export const setTokenTTL = (unixTime: number): void => {
  window.localStorage.setItem(LocalStorageEnum.tokenTTL, String(unixTime));
};

export const removeToken = (): void => {
  window.localStorage.removeItem(LocalStorageEnum.auth0token);
};

export const removeTokenTTL = (): void => {
  window.localStorage.removeItem(LocalStorageEnum.tokenTTL);
};
