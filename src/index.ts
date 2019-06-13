import { parse } from 'url';

const redisDefaultPort = 6379;
const sentinelDefaultPort = 26379;

export interface IRedisUrl {
  host: string;
  port: number;
  database: string;
  password?: string;
};

const predefinedSeparatorRegexp = /,|;|\s/;


function prepareResult(v: string, sentinel: boolean): IRedisUrl {
  if (v.search('://') == -1) {
    v = 'redis://' + v;
  }
  const urlWithStringQuery = parse(v);

  return {
    host: urlWithStringQuery.hostname || 'localhost',
    port: Number(urlWithStringQuery.port || (sentinel ? sentinelDefaultPort : redisDefaultPort)),
    database: (urlWithStringQuery.pathname || '/0').substr(1) || '0',
    password: urlWithStringQuery.auth ? decodeURIComponent(urlWithStringQuery.auth) : undefined,
  };
}

export function parseRedisUrl(value?: string, sentinel: boolean = false, separatorRegexp: RegExp = predefinedSeparatorRegexp): IRedisUrl[] {
  if (!value) {
    return [{
      host: 'localhost',
      port: (sentinel ? sentinelDefaultPort : redisDefaultPort),
      database: '0',
    }];
  }

  const result = new Array<IRedisUrl>();
  const urlValues = value.split(separatorRegexp).map(value1 => value1.trim()).filter(value1 => value1 && value1.length);

  for (const urlValue of urlValues) {
    const parsedResult = prepareResult(urlValue, sentinel);
    result.push(parsedResult);
  }

  return result;
}

