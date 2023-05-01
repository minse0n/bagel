import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  // Google - google id / google OAuth logged in or not
  googleId: string = '';
  googleLoggedin: boolean = false;
  // RWTH Email Verification - rwth email / verification code / email verified or not  
  rwthEmail: string = '';  // email-address from the input
  verificationCode: string = '';  // verification code received in email
  sentCode: boolean = false;  // verification code sent successfully or not
  verified: boolean = false;  // Verification of RWTH email successfully or not 


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private cookieService: CookieService
    ) {
      this.userService.setGoogleLoggedIn('true');
  }

  ngOnInit(): void {
    // Check the status of singup
    this.googleLoggedin = Boolean(this.userService.getGoogleLoggedIn());
    this.sentCode = Boolean(this.userService.getSentCode());
    this.verified = Boolean(this.userService.getVerified());

    this.loginCheck();
  }

  // 가입 상태 확인하는 fucntion
  loginCheck() {
    // 기존 회원이 로그인한 경우 = 구글 로그인 성공 && rwth email 인증
    if (this.googleLoggedin && this.sentCode && this.verified) {
      this.router.navigate(['/']);
    }
    // 구글 로그인 성공 && rwth email 미인증 경우
    const googleID = this.route.snapshot.queryParamMap.get('googleID');
    this.googleId = googleID;
  }


  // Verification rwth email
  verificationEmail(email: string) {
    const verifyEmail$ = this.userService.verificationEmail(email);
    
    verifyEmail$.subscribe(res => {
      if (res.status === 200) {
        this.sentCode = true;
        this.userService.setSentCode('true');
        // pop up msg for success
        this.toastr.info('', 'Verification code has been sent.', {
          timeOut: 60000,  // pop up displayed time
          progressBar: true,
          positionClass: 'toast-top-center',
        });
      }
    },
    // error 발생 시 메시지 pop up (이미 코드를 요청한 경우 / 이미 인증된 메일인 경우)
    error => {
      // pop up msg for error
      this.toastr.error('', `${error.error.message}`, {
        positionClass: 'toast-top-center',
      });
    });
  }

  // Validate verification code
  validateCode(code: string) {
    const validateCode$ = this.userService.validateCode(this.rwthEmail, code);

    validateCode$.subscribe(res => {
      if (res.status === 200) {

        // rwth verification 인증됨 update
        this.verified = true;
        this.userService.setVerified('true');
        // rwth verification 인증됨 DB user information update
        this.userService.updateDBVerified(true);

        // remove popup for verification code previously triggered
        this.toastr.clear();
        // pop up for verification success
        this.toastr.success('', 'Hey! Welcome to Bagel.', {
          timeOut: 5000,  // pop up displayed time
          positionClass: 'toast-top-center',
        });

        this.router.navigate(['/']);
      }
    },
    // error 발생 시 메시지 pop up (이미 인증된 메일인 경우 / 인증 시간 초과 / 코드 불일치)
    error => {
      // pop up msg for error
      this.toastr.error('', `${error.error.message}`, {
        positionClass: 'toast-top-center',
      });
    });
  }

}
