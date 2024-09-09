declare module 'cookiejar' {
  export class CookieJar {
    constructor();
    setCookie(cookie: string): void;
    getCookies(): string[];
  }
}
