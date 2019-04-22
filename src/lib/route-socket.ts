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
    if (e.url === this.config.routerPath && !this.activeRoute) {
      super.connect();
    }
  }

  onNavStart(e: NavigationStart) {
    // Disconnect on navigation start to other path
    if (e.url !== this.config.routerPath) {
      this.activeRoute = false;
      super.disconnect();
    }
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
