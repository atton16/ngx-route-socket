import { Component, OnInit } from '@angular/core';
import { CheckinSocket } from './checkin.socket';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-checkin',
  template: '<h3>Checkin Page</h3><nav><a routerLink="/">Home</a></nav>'
})
export class CheckinComponent implements OnInit {

  constructor(private checkinSocket: CheckinSocket) { }

  ngOnInit() {
    this.checkinSocket.emit('message', 'Hello World!');
    this.checkinSocket
      .fromEvent<{msg: string}>('message')
      .pipe(
        map(data => data.msg)
      ).subscribe(msg => console.log(msg));
  }
}
