import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { USERS } from './dummyUser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  clickEvent = '';
  myUser = USERS;
  navMode: string = 'saved';
     
  constructor() { }

  ngOnInit(): void {
  }
  changeViewMode() {
    if(this.navMode == 'saved') {
      this.navMode = 'edit';
    } else {
      this.navMode = 'saved';
    }
  }
  close(clickEvent: string) {
    this.clickEvent = clickEvent;
    this.sidenav.close();
  }


}
