import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { USERS } from './dummyUser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit{
       
  @Output() closeSideNav = new EventEmitter();
  navMode: string = 'saved';
  myUser = USERS;
  
  constructor() { }
  
  ngOnInit(): void {
	}
  
  onToggleClose(): void {
    this.closeSideNav.emit();
  }
  changeViewMode() {
    if(this.navMode=='saved') {
      this.navMode = 'edit';
    } else {
      this.navMode = 'saved';
    }
  }  
}
