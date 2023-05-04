import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AVATARS } from './avatar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit{
       
  @Output() closeSideNav = new EventEmitter();
  navMode: string = 'default';
  avatars = AVATARS;
  curUser = {
    userId: '',
    username: '',
    googleID: '',
    avatarUrl: '',
  }
  constructor( private _authService: AuthService ) { 
  }
  
  ngOnInit(): void {
    this.curUser.googleID = this._authService.getGoogleID();
    this.curUser.avatarUrl = this._authService.getAvatarUrl();
	}
  
  onToggleClose(): void {
    this.closeSideNav.emit();
  }
  changeViewMode() {
    if(this.navMode=='default') {
      this.navMode = 'edit';
    } else {
      this.navMode = 'default';
    }
  }
  changeAvatar(imageObject: { avatarUrl: string; }) {
    this.curUser.avatarUrl = imageObject.avatarUrl;
  }  
  updateUser() {
    console.log('todo');
    
  }
}
