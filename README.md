# ngx-route-socket

Route-specific [Socket.IO](http://socket.io/) module for Angular 7

This library is a wrapper around `ngx-socket-io` package.

## Install

```bash
npm install ngx-route-socket
```

## How to use

### Import and extend RouteSocket

`checkin.socket.ts`

```ts
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
```

### Register our newly created CheckinSocket and CheckinSocketConfigProvider

`app.module.ts`

```ts
...
import { CheckinSocket, CheckinSocketConfigProvider } from './checkin.socket';

@NgModule({
  ...
  providers: [
    ...
    CheckinSocketConfigProvider,
    CheckinSocket,
    ...
  ],
  ...
})
```

### Using your CheckinSocket instance

`checkin.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { CheckinSocket } from './checkin.socket';

@Component({
  selector: 'checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  constructor(private checkinSocket: CheckinSocket) { }

  ngOnInit() {
    this.checkinSocket.emit('message', msg);
    this.checkinSocket
      .fromEvent('message')
      .map( data => data.msg );
  }

}
```

## API

See [ngx-socket-io](https://github.com/rodgc/ngx-socket-io#api) for API details

## LICENSE

MIT