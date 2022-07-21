import { queryStringify } from "../utils/helpers";

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};


type OptionsProp = {
    headers?: {[key: string]: string},
    method?: string,
    timeout?: number,
    data?: any,
    includeCredentials?: boolean
}
export default class HTTPTransport {
    get = (url: string, options: OptionsProp = {}) => {
      url = `${url}?${queryStringify(options.data!)}`;     
      return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };
    put = (url: string, options: OptionsProp = {}) => {
      return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    post = (url: string, options: OptionsProp = {}) => {
      return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    delete = (url: string, options: OptionsProp = {}) => {
      return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };


    request = (url: string, options: OptionsProp = {method: METHODS.GET, includeCredentials: true}, timeout = 5000) => {
      const {method, headers = {}, data, includeCredentials} = options;
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method!, `${process.env.API_ENDPOINT}/${url}`);

        xhr.timeout = timeout;

        xhr.withCredentials = true;

      
        xhr.onload = function() {
          resolve(xhr);
        };

        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
        
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;

        if (method === METHODS.GET || !data) {
          xhr.send();
        } else {
          xhr.send(data);
        }
      }).then((response: any) => {
        let result;
        try {
          result = JSON.parse(response.response);
        } catch {
          result = response.response
        }
        return result;
      })
      .then((data) => {
        return data as unknown as ResponseData;
      });
    };
}