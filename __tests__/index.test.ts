import {parseRedisUrl} from "../src";

test('Test empty', () => {
    const result0 = parseRedisUrl()
    expect(result0.length).toBe(1);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(6379);
    expect(result0[0].database).toBe('0');
    expect(result0[0].password).toBe(undefined);
});

test('Test single', () => {
    const result0 = parseRedisUrl('redis://test-host:6543')
    expect(result0.length).toBe(1);
    expect(result0[0].host).toBe('test-host');
    expect(result0[0].port).toBe(6543);
    expect(result0[0].database).toBe('0');
    expect(result0[0].password).toBe(undefined);
});

test('Test multiple sentinel [,]', () => {
    const result0 = parseRedisUrl('localhost,localhost-1', true)
    expect(result0.length).toBe(2);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(26379);
    expect(result0[0].database).toBe(undefined);
    expect(result0[0].password).toBe(undefined);

    expect(result0[1].host).toBe('localhost-1');
    expect(result0[1].port).toBe(26379);
    expect(result0[0].database).toBe(undefined);
    expect(result0[1].password).toBe(undefined);
});

test('Test multiple sentinel [;]', () => {
    const result0 = parseRedisUrl('localhost;localhost-1', true)
    expect(result0.length).toBe(2);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(26379);
    expect(result0[0].database).toBe(undefined);
    expect(result0[0].password).toBe(undefined);

    expect(result0[1].host).toBe('localhost-1');
    expect(result0[1].port).toBe(26379);
    expect(result0[0].database).toBe(undefined);
    expect(result0[1].password).toBe(undefined);
});

test('Test multiple sentinel [, ]', () => {
    const result0 = parseRedisUrl('localhost:26780, localhost-1', true)
    expect(result0.length).toBe(2);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(26780);
    expect(result0[0].database).toBe(undefined);
    expect(result0[0].password).toBe(undefined);

    expect(result0[1].host).toBe('localhost-1');
    expect(result0[1].port).toBe(26379);
    expect(result0[0].database).toBe(undefined);
    expect(result0[1].password).toBe(undefined);
});

test('Test multiple sentinel [# ] custom separator ', () => {
    const result0 = parseRedisUrl('vv@localhost:26780# localhost-1', true, /#|;|\\/)
    expect(result0.length).toBe(2);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(26780);
    expect(result0[0].password).toBe(undefined);

    expect(result0[1].host).toBe('localhost-1');
    expect(result0[1].port).toBe(26379);
    expect(result0[1].password).toBe(undefined);
});

test('Test redis special credentials in password ', () => {
    const result0 = parseRedisUrl(
        'redis://' + Buffer.from('my:super/\\!secure?password').toString('hex') + '@example.com:39143/',
        false, /#|;|\\/, 'hex')
    expect(result0.length).toBe(1);
    expect(result0[0].host).toBe('example.com');
    expect(result0[0].port).toBe(39143);
    expect(result0[0].password).toBe('super/\\!secure?password');
});

test('Test redis omit user name ', () => {
    const result0 = parseRedisUrl('redis://user:super@example.com:39143/', false, /#|;|\\/)
    expect(result0.length).toBe(1);
    expect(result0[0].host).toBe('example.com');
    expect(result0[0].port).toBe(39143);
    expect(result0[0].password).toBe('super');
});

test('Test redis no user name ', () => {
    const result0 = parseRedisUrl('redis://:super@example.com:39143/', false, /#|;|\\/)
    expect(result0.length).toBe(1);
    expect(result0[0].host).toBe('example.com');
    expect(result0[0].port).toBe(39143);
    expect(result0[0].password).toBe('super');
});




