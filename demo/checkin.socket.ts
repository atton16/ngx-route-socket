import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouteSocket, RouteSocketConfig } from 'ngx-route-socket';

export const CheckinSocketConfigProvider = {
  provide: 'CHECKIN_SOCKET_CONFIG',
  useValue: new RouteSocketConfig({url: 'http://localhost:3001', routerPath: '/checkin', debug: true}),
};

@Injectable()
export class CheckinSocket extends RouteSocket {
  constructor(
    @Inject('CHECKIN_SOCKET_CONFIG') config: RouteSocketConfig,
    router: Router) {
    super(config, router);
  }
}
