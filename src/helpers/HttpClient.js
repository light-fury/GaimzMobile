/* eslint-disable no-console */
import { decamelizeKeys, camelizeKeys } from 'humps';
import AsyncStorage from '@react-native-community/async-storage';

const BasicApiUrl = 'https://basicapi.gaimz.com';
const MatchMakingApiUrl = 'https://mmapi.gaimz.com';

// Default timeout
let timeoutMs = 10000;

function HttpClientException(status, error) {
  this.status = status;
  this.error = error;
  this.name = 'HttpClientException';
}

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

const setTimeout = (ms) => {
  timeoutMs = ms;
};

const wrapFetchInTimeout = (fetchRequest) => {
  let timeoutHandleId = null;
  const timeout = new Promise((resolve, reject) => {
    timeoutHandleId = setTimeout(() => {
      reject();
    }, timeoutMs, 'request timed out');
  });
  return Promise.race([
    timeout,
    fetchRequest,
  ]).then((result) => {
    clearTimeout(timeoutHandleId);
    return result;
  }).catch((e) => {
    console.info('in wrapper error', e);
  });
};

async function innerFetch(method, url, headers = {}, data, options) {
  try {
    if (!options.baseUrl) {
      throw Error('No URL Provided to HttpClient');
    }
    const request = {
      method,
      headers: {
        ...headers,
      },
    };

    if (!options.anonymous) {
      const authToken = await AsyncStorage.getItem('AuthToken');
      if (!authToken) {
        throw Error('No AuthToken present');
      }
      request.headers.Authorization = `Bearer ${authToken}`;
    }

    if (data) {
      request.body = JSON.stringify(decamelizeKeys(data));
    }
    const concatUrl = `${options.baseUrl}${url}`;
    console.info('request:', request);
    console.info('url:', url);

    if (options.abortController) {
      request.signal = options.abortController.signal;
    }

    // eslint-disable-next-line no-undef
    const fetchReq = fetch(concatUrl, request);
    const response = await wrapFetchInTimeout(fetchReq);
    console.info('response:', response);
    const responseBody = await response.json();
    console.info('response body (pre-camelizeKeys):', responseBody);
    if (!response.ok) {
      throw HttpClientException(response.status, responseBody.error);
    }
    const payload = camelizeKeys(responseBody);
    return {
      status: response.status,
      payload,
      error: !response.ok ? response.error : null,
    };
  } catch (e) {
    return {
      // TODO: Do we want a different code?
      status: e.status,
      payload: null,
      error: e ? e.error.message : 'Unknown Error',
    };
  }
}

/**
 * HTTP POST via fetch API
 * @param {*} url - Url to hit (not including domain)
 * @param {*} data - Any data to be POSTed
 * @param {*} options - { baseUrl, anonymous, abortController }
 */
const post = async (url, data, options) => innerFetch(
  METHOD.POST,
  url,
  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data,
  options,
);

/**
 * HTTP GET via fetch API
 * @param {*} url - Url to hit (not including domain)
 * @param {*} options - { baseUrl, anonymous, abortController }
 */
const get = async (url, options) => innerFetch(
  METHOD.GET,
  url,
  {
    Accept: 'application/json',
  },
  null,
  options,
);

/**
 * HTTP PUT via fetch API
 * @param {*} url - Url to hit (not including domain)
 * @param {*} data - Any data to be PUT
 * @param {*} options - { baseUrl, anonymous, abortController }
 */
const put = async (url, data, options) => innerFetch(
  METHOD.PUT,
  url,
  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data,
  options,
);

/**
 * HTTP PATCH via fetch API
 * @param {*} url - Url to hit (not including domain)
 * @param {*} data - Any data to be PATCHed
 * @param {*} options - { baseUrl, anonymous, abortController }
 */
const patch = async (url, data, options) => innerFetch(
  METHOD.PATCH,
  url,
  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data,
  options,
);

/**
 * HTTP DELETE via fetch API
 * @param {*} url - Url to hit (not including domain)
 * @param {*} options - { baseUrl, anonymous, abortController }
 */
const deleteMethod = async (url, options) => innerFetch(
  METHOD.DELETE,
  url,
  {
    Accept: 'application/json',
  },
  null,
  options,
);

export default {
  setTimeout,
  post,
  get,
  put,
  patch,
  deleteMethod,

  BasicApiUrl,
  MatchMakingApiUrl,
};
