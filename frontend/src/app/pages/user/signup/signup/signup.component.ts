import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  verified: boolean;  // verified with RWTH email

  constructor() {
    this.verified = false;
  }

}
