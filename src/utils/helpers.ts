type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
} 
  
function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
} 

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
    return isPlainObject(value) || isArray(value);
} 

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];

    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value as PlainObject, rightValue as PlainObject)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
} 

function trim(str: string, symbol: null|string = null){
  if(symbol === null){
    symbol = '\xA0 ';
  }
  
    let re = new RegExp(`^[${symbol}]+`);
    str = str.replace(re,'');
    re = new RegExp('['+symbol+']+$', 'g');
    str = str.replace(re,'');
    return str;
  
}

export function toObject(response: string): ResponseData{
  const result: P = {};
  response = trim(response, '{}');
  response.split(',').forEach((value: string) => {
    const data = value.split(':');
    const key: string = trim(data[0], '\"');
    let val: string | null = ( data[1] ) ? trim(data[1], '\"') : '';
    if  ( val === 'null' ) val = null;  

    result[key] = val;
  });

  return result;
}

export function queryStringify(data: {[key: string]: any}) {
  let result = '';
  if (typeof data == 'object') {
    result = Object.keys(data).map(key => key + '=' + data[key]).join('&');
  }  
  return result;
}