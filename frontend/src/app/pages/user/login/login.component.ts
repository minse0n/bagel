import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private authUrl = 'http://localhost:8080/auth';
  // googleID: string;

  constructor(
    private userService: UserService
  ){}

  ngOnInit(){
    // const googleLogin$ = this.userService.googleLogin();

    // googleLogin$.subscribe(res => {
    //   this.googleID = res.googleID;
    //   console.log(this.googleID);
    // })
  }

  gLogin() {
    const googleLogin$ = this.userService.googleLogin();
    googleLogin$.subscribe(res => {
      console.log(res);
    })

  }
}
