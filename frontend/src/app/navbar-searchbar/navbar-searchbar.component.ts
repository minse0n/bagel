import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CATEGORIES } from '../models/post-category';

@Component({
  selector: 'app-navbar-searchbar',
  templateUrl: './navbar-searchbar.component.html',
  styleUrls: ['./navbar-searchbar.component.scss']
})
export class NavbarSearchbarComponent implements OnInit {

  @Output() SelectedCategory = new EventEmitter<string>();
  
  categories = CATEGORIES;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  selectedPostCategory(category: string) {
    this.SelectedCategory.emit(category);
  }
}
