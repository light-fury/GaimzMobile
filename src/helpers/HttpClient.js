/* eslint-disable no-console */
import { decamelizeKeys, camelizeKeys } from 'humps';

let baseUrl = 'https://basicapi.gaimz.com';
let authToken = '';
// Default timeout
let timeoutMs = 10000;

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

const setBaseUrl = (url) => {
  baseUrl = url;
};

const setTimeout = (ms) => {
  timeoutMs = ms;
};

const setAuthenticationToken = (token) => {
  authToken = token;
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
  });
};

async function innerFetch(method, url, headers = {}, data, abortController) {
  try {
    const request = {
      method,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...headers,
      },
    };

    if (data) {
      request.body = JSON.stringify(decamelizeKeys(data));
    }
    const combinedUrl = `${baseUrl}/${url}`;
    console.info('request:', request);
    console.info('url:', url);

    if (abortController) {
      request.signal = abortController.signal;
    }

    // eslint-disable-next-line no-undef
    const fetchReq = fetch(combinedUrl, request);
    const response = await wrapFetchInTimeout(fetchReq);
    console.info('response:', response);
    const responseBody = await response.json();
    console.info('response body (pre-camelizeKeys):', responseBody);
    const payload = camelizeKeys(responseBody);
    return {
      status: response.status,
      payload,
      error: !response.ok ? response.error : null,
    };
  } catch (e) {
    return {
      // TODO: Do we want a different code?
      status: -1,
      payload: null,
      error: e ? e.message : 'Unknown Error',
    };
  }
}

const post = async (url, data, abortController) => innerFetch(
  METHOD.POST,
  url,
  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data,
  abortController,
);

const get = async (url, abortController) => innerFetch(
  METHOD.GET,
  url,
  {
    Accept: 'application/json',
  },
  null,
  abortController,
);


export default {
  setBaseUrl,
  setAuthenticationToken,
  setTimeout,
  post,
  get,
};
