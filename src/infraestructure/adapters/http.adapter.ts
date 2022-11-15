import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '../helpers/localStorage.helper';
import PaginationDto from '../dtos/pagination.dto';
import { createUrlWithQuery, getUrl } from '../helpers/url.helper';

export const getConfigWithAuth = <IData = any>(
  token: string, config: AxiosRequestConfig<IData> = {},
): AxiosRequestConfig<IData> => ({
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

const getAuthorization = async <IData>(
  config: AxiosRequestConfig<IData> = {},
): Promise<AxiosRequestConfig<IData>> => {
  const existingToken: string | null = getToken();
  if (existingToken) {
    return getConfigWithAuth(existingToken, config);
  }
  return config;
};

const setPaginationInConfig = <IData>(
  config: AxiosRequestConfig<IData>,
  pagination: PaginationDto = new PaginationDto(),
): AxiosRequestConfig<IData> => ({
    ...config,
    params: {
      ...config.params,
      ...new PaginationDto(pagination),
    },
  });

export const get = async <IResponse = any, IQuery = any, IData = any>(
  url: string, query?: IQuery, config?: AxiosRequestConfig<IData>,
): Promise<AxiosResponse<IResponse>> => {
  const newConfig: AxiosRequestConfig<IData> = await getAuthorization<IData>(config);
  return axios.get<IResponse, AxiosResponse<IResponse>, IData>(
    createUrlWithQuery<IQuery>(getUrl(url), query),
    newConfig,
  );
};

export const getWithPagination = async <IResponse = any, IQuery = any, IData = any>(
  url: string, pagination: PaginationDto, query?: IQuery, config?: AxiosRequestConfig<IData>,
): Promise<AxiosResponse<IResponse>> => {
  const newConfig: AxiosRequestConfig<IData> = await getAuthorization<IData>(config);
  const uri = createUrlWithQuery<IQuery>(getUrl(url), query);
  const paginationConfig = setPaginationInConfig(newConfig, pagination);
  return axios.get<IResponse, AxiosResponse<IResponse>, IData>(
    uri,
    paginationConfig,
  );
};

export const post = async <IData = any, IResponse = any>(
  url: string, data: IData, config?: AxiosRequestConfig<IData>,
): Promise<AxiosResponse<IResponse>> => {
  const newConfig: AxiosRequestConfig<IData> = await getAuthorization<IData>(config);
  return axios.post<IResponse, AxiosResponse<IResponse>, IData>(getUrl(url), data, newConfig);
};

export const postWithPagination = async <IData = any, IResponse = any>(
  url: string, data: IData, pagination: PaginationDto, config?: AxiosRequestConfig<IData>,
): Promise<AxiosResponse<IResponse>> => {
  const newConfig: AxiosRequestConfig<IData> = await getAuthorization<IData>(config);
  return axios.post<IResponse, AxiosResponse<IResponse>, IData>(
    getUrl(url),
    data,
    setPaginationInConfig(newConfig, pagination),
  );
};

export const put = async <IData = any, IResponse = any>(
  url: string, data: IData, config?: AxiosRequestConfig<IData>,
): Promise<AxiosResponse<IResponse>> => {
  const newConfig: AxiosRequestConfig<IData> = await getAuthorization<IData>(config);
  return axios.put<IResponse, AxiosResponse<IResponse>, IData>(getUrl(url), data, newConfig);
};

export const patch = async <IData = any, IResponse = any>(
  url: string, data: IData, config?: AxiosRequestConfig<IData>,
): Promise<AxiosResponse<IResponse>> => {
  const newConfig: AxiosRequestConfig<IData> = await getAuthorization<IData>(config);
  return axios.patch<IResponse, AxiosResponse<IResponse>, IData>(getUrl(url), data, newConfig);
};

export const del = async <IData = any, IResponse = any>(
  url: string, config?: AxiosRequestConfig<IData>,
): Promise<AxiosResponse<IResponse>> => {
  const newConfig: AxiosRequestConfig<IData> = await getAuthorization<IData>(config);
  return axios.delete<IResponse, AxiosResponse<IResponse>, IData>(getUrl(url), newConfig);
};
