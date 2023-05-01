import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Output() SideNavToggle = new EventEmitter();

  headerFixed: boolean = false;
  isLoggedIn: boolean = false;
  screenMode: string;

  constructor(
    public matDialog: MatDialog,
  ) {}
  
  ngOnInit(): void {  
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }

  // Function for google login 
  signup(): void {
      window.location.href = 'http://localhost:8080/auth/login/google';
  }  

  openSidenav() {
    this.SideNavToggle.emit();
  }
  

  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "W" : this.screenMode = "M";
  }
  
  @HostListener('window:scroll', ['$event']) onscroll() {
    if(window.scrollY > 1) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }
}
