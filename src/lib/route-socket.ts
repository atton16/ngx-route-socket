import { Injectable, Inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouteSocketConfig } from './route-socket.config';

@Injectable()
export class RouteSocket extends Socket {
  private activeRoute = false;
  private config: RouteSocketConfig;

  constructor(config: RouteSocketConfig, public router: Router) {
    super({ url: config.url, options: config.options });
    this.config = config;
    this.activeRoute = true;
    super.on('connect', this.onConnect.bind(this));
    super.on('disconnect', this.onDisconnect.bind(this));

    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.onNavEnd.bind(this));

    router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(this.onNavStart.bind(this));
  }

  onNavEnd(e: NavigationEnd) {
    // Connect on navigation end to our path and our path was previously not active
    if (this.config.routerPath instanceof Array) {
      const paths = this.config.routerPath as string[];
      if (paths.includes(e.url) && !this.activeRoute) {
        this._tmpConnect();
      }
    } else if (this.config.routerPath instanceof RegExp) {
      const pattern = this.config.routerPath as RegExp;
      if (e.url.match(pattern) && !this.activeRoute) {
        this._tmpConnect();
      }
    } else {
      if (e.url === this.config.routerPath && !this.activeRoute) {
        this._tmpConnect();
      }
    }
  }

  onNavStart(e: NavigationStart) {
    // Disconnect on navigation start to other path
    if (this.config.routerPath instanceof Array) {
      const paths = this.config.routerPath as string[];
      if (!paths.includes(e.url)) {
        this._tmpDisconnect();
      }
    } else if (this.config.routerPath instanceof RegExp) {
      const pattern = this.config.routerPath as RegExp;
      if (!e.url.match(pattern)) {
        this._tmpDisconnect();
      }
    } else {
      if (e.url !== this.config.routerPath) {
        this._tmpDisconnect();
      }
    }
  }

  private _tmpConnect() {
    this.activeRoute = true;
    super.connect();
  }

  private _tmpDisconnect() {
    this.activeRoute = false;
    super.disconnect();
  }

  onConnect() {
    if (this.config.debug) {
      console.log(`RouteSocket: '${this.config.url}' connected`);
    }
  }

  onDisconnect() {
    if (this.config.debug) {
      console.log(`RouteSocket: '${this.config.url}' disconnected`);
    }
  }
}
