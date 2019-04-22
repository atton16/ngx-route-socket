import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: '<h3>Home Page</h3><nav><a routerLink="/checkin">Checkin</a></nav>'
})
export class HomeComponent {
}
