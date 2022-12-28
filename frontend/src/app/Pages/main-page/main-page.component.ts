import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  selectedCategory: string;
  constructor() { }

  ngOnInit(): void {
  }
  
  changePostCategory(postCategory: string) {
    this.selectedCategory = postCategory;
  }
}
