import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private scroller: ViewportScroller
  ) {}
  
  ngOnInit(): void {}
  
  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
}
