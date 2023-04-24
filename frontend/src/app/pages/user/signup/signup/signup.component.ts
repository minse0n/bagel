import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
// TODO: 이 로컬에서 불러오는 코드는 삭제할 것 - 아바타 이미지를 서버에서 가져오도록 세팅 후
// 임시로 local에서 불러오기 위한 import
import { AVATARS } from '../../../../pages/layout/sidenav/avatar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  rwthEmail: string;  // email-address from the input
  verificationCode: string;  // verification code received in email
  googleId: string;  // google id(OAuth)
  username: string;  // user id
  sentCode: boolean;  // verification code sent successfully or not 
  verified: boolean;  // Verification of RWTH email successfully or not 
  googleLoggedin: boolean; // google OAuth logged in or not
  signupSuccess: boolean;  // bagel signup success
  avatarUrl: string;  // resource for avatar image

  // TODO: 추후 지울것 - 아바타 로컬 import 
  avatar = AVATARS;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
    ) {
  }

  ngOnInit(): void {
    // Initialize all values
    this.rwthEmail = "";  
    this.verificationCode = "";
    this.username = ""
    this.sentCode = false;
    this.verified = false;
    this.googleLoggedin = false;
    this.signupSuccess = false;
    // TODO: 삭제할 것 - 임시 googleID
    this.googleId = "113118203511074540106";
  }

  // Verification rwth email
  verificationEmail(email: string) {

    const verifyEmail$ = this.userService.verificationEmail(email);

    verifyEmail$.subscribe(res => {
      // TODO: console.log 지울 것
      console.log(res.status);
      console.log(res);
      if (res.status === 200) {
        this.sentCode = true;
        this.toastr.info('', 'Verification code has been sent.', {  // set pop up
          timeOut: 60000,
          progressBar: true,
          positionClass: 'toast-top-center',
        });
      }
    },
    error => {
      // TODO: console.log 지울 것
      // TODO: error 발생 시, 화면 메시지 출력 설정
      console.log(error.status); 
      console.log(error.error);
    });
  }

  // Validate verification code
  validateCode(code: string) {
    // TODO: console.log 지울 것
    console.log(this.rwthEmail, code);
    const validateCode$ = this.userService.validateCode(this.rwthEmail, code);

    validateCode$.subscribe(res => {
      // TODO: console.log 지울 것
      console.log(res.status);
      console.log(res);
      if (res.status === 200) {
        this.verified = true;
        this.googleLoggedin = true;
        this.toastr.success('', 'Verification success !', {  // set pop up
          positionClass: 'toast-top-center',
        });
        console.log('verification success!')
        // TODO: 구글 로그인 연결 부분 - 추후 수정 필요
        // window.location.href = 'http://localhost:8080/auth/login/google';

        // 일단 구글 로그인에 성공했다고 가정하고 코드 작성
        // TODO: 구글 로그인 설정 이후, 수정 필요
        this.toastr.success('', 'Sign up success !', {
          positionClass: 'toast-top-center',
        });
      }
    },
    error => {
      // TODO: console.log 지울 것
      // TODO: error 발생 시, 화면 메시지 출력 설정
        console.log(error.status);
        console.log(error.error);
    });
  }

  // Bagel signup
  bagelSignup(username: string) {
    this.avatarUrl = this.avatar.find(obj => obj.avatarID === 1).avatarUrl
    const bagelSingup$ = this.userService.bagelSignup(this.googleId, username, this.avatarUrl);

    bagelSingup$.subscribe(res => {
      if (res.status === 200) {
        this.signupSuccess = true;
        this.toastr.success('', 'Sign up success !', {  // set pop up
          positionClass: 'toast-top-center',
        });
      }
      else if (res.status === 404) {
        this.signupSuccess = false;
        this.toastr.error('', 'Sign up failed !', {  // set pop up
          positionClass: 'toast-top-center',
        });
      }
    })
  }
}
