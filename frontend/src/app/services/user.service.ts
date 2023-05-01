import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private verificationUrl = 'http://localhost:8080/verification';
  private authUrl = 'http://localhost:8080/auth';

  // Google - google id / google OAuth logged in or not
  setGoogleLoggedIn(loggedin: string) {
    localStorage.setItem('googleLoggedIn', loggedin)
  }
  getGoogleLoggedIn() {
    return localStorage.getItem('googleLoggedIn')
  }
  // RWTH Email Verification - verification code sent or not / email verified or not  
  setSentCode(sent: string) {
    localStorage.setItem('sentCode', sent)
  }
  getSentCode() {
    return localStorage.getItem('sentCode')
  }
  setVerified(verified: string) {
    localStorage.setItem('verified', verified)
  }
  getVerified() {
    return localStorage.getItem('verified')
  }


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }


  // 1. Verification rwth email
  // send the verification code to the email user entered in input
  verificationEmail (email: string) {
    const body = { email };
    // observe: 'response' - 특정 헤더 정보나 status code 확인을 위해 전체 응답을 받는 옵션
    return this.http.post<any>(`${this.verificationUrl}/send`, body, { observe: 'response' }); 
  }

  // 2. Validate verification code
  validateCode(email: string, verifiCode: string) {
    const body = { email, verifiCode };
    return this.http.post<any>(`${this.verificationUrl}/check`, body, { observe: 'response' });
    }

  // 3. Update DB for User information  - rwthVerified: true
  updateDBVerified(rwthVerified: boolean) {
    const body = rwthVerified;
    return this.http.post<any>(`${this.verificationUrl}/google/update/verified`, body, { observe: 'response' });
  }

}
