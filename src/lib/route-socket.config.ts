export class RouteSocketConfig {
  url: string;
  routerPath: string | RegExp | string[];
  options: any = {};
  debug = false;

  constructor(initializer: {
    url: string,
    routerPath: string | RegExp | string[],
    options?: any,
    debug?: boolean,
  }) {
    this.url = initializer.url;
    this.routerPath = initializer.routerPath;
    this.options = (typeof initializer.options !== 'undefined') ? initializer.options : {};
    this.debug = (typeof initializer.debug !== 'undefined') ? initializer.debug : false;
  }
}
