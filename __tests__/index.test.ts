import {parseRedisUrl} from "../src";

test('Test empty', () => {
    const result0 = parseRedisUrl()
    expect(result0.length).toBe(1);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(6379);
    expect(result0[0].password).toBe(undefined);
});

test('Test single', () => {
    const result0 = parseRedisUrl('redis://test-host:6543')
    expect(result0.length).toBe(1);
    expect(result0[0].host).toBe('test-host');
    expect(result0[0].port).toBe(6543);
    expect(result0[0].password).toBe(undefined);
});

test('Test multiple sentinel [,]', () => {
    const result0 = parseRedisUrl('localhost,localhost-1', true)
    expect(result0.length).toBe(2);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(26379);
    expect(result0[0].password).toBe(undefined);

    expect(result0[1].host).toBe('localhost-1');
    expect(result0[1].port).toBe(26379);
    expect(result0[1].password).toBe(undefined);
});

test('Test multiple sentinel [;]', () => {
    const result0 = parseRedisUrl('localhost;localhost-1', true)
    expect(result0.length).toBe(2);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(26379);
    expect(result0[0].password).toBe(undefined);

    expect(result0[1].host).toBe('localhost-1');
    expect(result0[1].port).toBe(26379);
    expect(result0[1].password).toBe(undefined);
});

test('Test multiple sentinel [, ]', () => {
    const result0 = parseRedisUrl('localhost:26780, localhost-1', true)
    expect(result0.length).toBe(2);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(26780);
    expect(result0[0].password).toBe(undefined);

    expect(result0[1].host).toBe('localhost-1');
    expect(result0[1].port).toBe(26379);
    expect(result0[1].password).toBe(undefined);
});

test('Test multiple sentinel [# ] custom separator ', () => {
    const result0 = parseRedisUrl('localhost:26780# localhost-1', true, /#|;|\\/)
    expect(result0.length).toBe(2);
    expect(result0[0].host).toBe('localhost');
    expect(result0[0].port).toBe(26780);
    expect(result0[0].password).toBe(undefined);

    expect(result0[1].host).toBe('localhost-1');
    expect(result0[1].port).toBe(26379);
    expect(result0[1].password).toBe(undefined);
});


