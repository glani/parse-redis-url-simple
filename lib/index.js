"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const redisDefaultPort = 6379;
const sentinelDefaultPort = 26379;
;
const predefinedSeparatorRegex = /,|;|\s/;
const predefinedSeparator = ',; ';
function prepareResult(v, sentinel) {
    const urlWithStringQuery = url_1.parse(v);
    return {
        host: urlWithStringQuery.hostname || 'localhost',
        port: Number(urlWithStringQuery.port || (sentinel ? sentinelDefaultPort : redisDefaultPort)),
        database: (urlWithStringQuery.pathname || '/0').substr(1) || '0',
        password: urlWithStringQuery.auth ? decodeURIComponent(urlWithStringQuery.auth) : undefined
    };
}
function parseRedisUrl(value, sentinel = false, separator = predefinedSeparator) {
    if (!value) {
        return [{
                host: 'localhost',
                port: (sentinel ? sentinelDefaultPort : redisDefaultPort),
                database: '0'
            }];
    }
    const result = new Array();
    const regex = separator === predefinedSeparator ? predefinedSeparatorRegex : new RegExp(separator);
    const urlValues = value.split(regex).filter(value1 => value1 && value1.length);
    for (const urlValue of urlValues) {
        const parsedResult = prepareResult(urlValue, sentinel);
        result.push(parsedResult);
    }
    return result;
}
exports.parseRedisUrl = parseRedisUrl;
//# sourceMappingURL=index.js.map