import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bagel';
  screenMode: string;
  
  constructor(
    private scroller: ViewportScroller,
    private router: Router,
  ) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }

  ngOnInit(): void {
  }
  
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
  plusNewCard() {
    this.router.navigate(['/register']);
  }
}
