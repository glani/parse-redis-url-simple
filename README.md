# parse-redis-url-simple parsion redis urls with sentinel support

[![Build Status](https://travis-ci.org/glani/parse-redis-url-simple.svg?branch=master)](https://travis-ci.org/glani/parse-redis-url-simple)
[![npm version](https://badge.fury.io/js/parse-redis-url-simple.svg)](https://badge.fury.io/js/parse-redis-url-simple)

Simple parser for redis url.
It supports sentinel urls for [ioredis](https://github.com/luin/ioredis)



Module usage
------------

```javascript
const parseRedisUrl = require('parse-redis-url-simple')

// Defaults to localhost:6379/0
parseRedisUrl()
//=> [{host: 'localhost', port: 6379, database: '0', password: undefined}]
parseRedisUrl('redis://')
//=> [{host: 'localhost', port: 6379, database: '0', password: undefined}]

// But you can change databases by adding a path
parseRedisUrl('redis:///1')
//=> [{host: 'localhost', port: 6379, database: '1', password: undefined}]

// Many instances
parseRedisUrl('redis://barhost.com:39143/,redis://foohost.com:39143/')
//=> [{host: 'barhost.com', port: 39143, database: '0', password: undefined}, 
//=>  {host: 'foohost.com', port: 39143, database: '0', password: undefined}]

// And even add passwords
parseRedisUrl('redis://n9y25ah7@foohost.com:39143/')
parseRedisUrl('redis://:n9y25ah7@foohost.com:39143/')
//=> [{host: 'foohost.com', port: 39143, database: '0', password: 'n9y25ah7'}]

// If you add a username, it's ignored
parseRedisUrl('redis://user:hunter2@foohost.com:39143/')
//=> [{host: 'foohost.com', port: 39143, database: '0', password: 'hunter2'}]

// For sentinels: just set parameter sentinel=true
parseRedisUrl('barhost.com:39143,foohost.com:39143,foobarhost.com:39143', sentinel=true)
//=> [{host: 'barhost.com', port: 39143},{host: 'foohost.com', port: 39143},{host: 'foobarhost.com', port: 39143}]

```
#### More examples
Could be found here:
* [tests](__tests__/): the set of unit tests.

Prior art
---------
All implementations are not for production use only for testing purposes. 
Usually there have been more than onde redis server in production. Moreover sometimes it is implemented via cluster or sentinel.

