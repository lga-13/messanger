/* eslint-disable @typescript-eslint/no-explicit-any */

interface IBodyParam {
  [key: string]: any;
}

export default class APIClient {
  static request(
    method: string,
    url: string,
    body: IBodyParam | null = null,
    params: Record<string, string> | null = null,
  ) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let constructedURL = url;

      // Handling params for GET request
      if (method === 'GET' && params) {
        const queryParams = new URLSearchParams(params).toString();
        constructedURL = `${url}?${queryParams}`;
      }

      xhr.open(method, constructedURL, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(JSON.parse(xhr.response));
        }
      };

      xhr.onerror = () => {
        reject(xhr.response);
      };

      // Handling body for POST, PUT, DELETE requests
      if (body && method !== 'GET') {
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  }

  static get(url: string, params: Record<string, string>) {
    return APIClient.request('GET', url, null, params);
  }

  static post(url: string, body: IBodyParam) {
    return APIClient.request('POST', url, body);
  }

  static put(url: string, body: IBodyParam) {
    return APIClient.request('PUT', url, body);
  }

  static delete(url: string, body: IBodyParam) {
    return APIClient.request('DELETE', url, body);
  }
}
