import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <header-comp></header-comp>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeLayoutComponent {}