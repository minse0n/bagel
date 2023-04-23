import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../../services/user.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  rwthEmail: string;  // email-address from the input
  verificationCode: string;  // verification code received in email
  googleId: string;  // google id(OAuth)
  userId: string;  // user id
  sentCode: boolean;  // verification code sent successfully or not 
  verified: boolean;  // Verification of RWTH email successfully or not 
  googleLoggedin: boolean; // google OAuth logged in or not

  constructor(
    private userService: UserService,
    private toastr: ToastrService
    ) {
  }

  ngOnInit(): void {
    this.rwthEmail = "";  // intiallize mail address
    this.verificationCode =""; // intiallize verification code 
    this.sentCode = false;
    this.verified = false;
    this.googleLoggedin = false;
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
        this.toastr.info('', 'Verification code has been sent.', {
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
        this.toastr.success('', 'Verification success !', {
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
}
