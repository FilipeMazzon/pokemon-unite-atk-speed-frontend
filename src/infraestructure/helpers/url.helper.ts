import {SERVER_URL} from '../config/server.config';

export const createUrl = (uri: string): URL => new URL(uri);

export const createUrlWithQuery = <Query = any>(
  uri: string, queryObject?: Query,
): string => {
  const url: URL = createUrl(uri);
  if (queryObject) {
    Object.keys(queryObject).forEach((key: string) => {
      // @ts-ignore
      const value: string = queryObject[key] as string;
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
};

export const goToUrl = (url: string): void => {
  window.location.href = url;
};

export const getUrl = (url: string): string => {
  if (url.includes('http')) {
    return url;
  }

  return `${SERVER_URL}${url}`;
};

export const getPathWithQuery = <Query = any>(
  uri: string, queryObject?: Query,
) => {
  const url = getUrl(uri);

  const urlWithQuery = createUrlWithQuery(url, queryObject);

  return urlWithQuery.replace(SERVER_URL, '');
};

export const changeQueryWithoutReload = <Query = any>(queries: Query) => {
  const url = window.location.origin + window.location.pathname;

  const newUrl = createUrlWithQuery(url, queries);

  window.history.pushState(null, '', newUrl);
};
