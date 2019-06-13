export interface IRedisUrl {
    host: string;
    port: number;
    database: string;
    password?: string;
}
export declare function parseRedisUrl(value?: string, sentinel?: boolean, separator?: string): IRedisUrl[];
