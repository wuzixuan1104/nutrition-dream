import fetch from 'node-fetch';
// import testJSON from '../utils/testJson';

const respOuput = (res): any => {
  try {
    return res.json();
  } catch (e) {
    return res;
  }
};

const fetcher = {
  post: (url, { body = {}, headers = {} } = {}): Promise<Response> => fetch(url, {
    method: 'POST',
    body: typeof body !== 'string' ? JSON.stringify(body) : '',
    headers: {
      'Content-type': 'application/json',
      ...headers,
    },
  })
    .then((res) => respOuput(res)),

  get: (url, { headers = {} } = {}): Promise<Response> => fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      ...headers,
    },
  })
    .then((res) => respOuput(res)),
};

export default fetcher;
