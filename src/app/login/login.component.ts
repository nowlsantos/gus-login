import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  private submitted = false;

  constructor(private fb: FormBuilder,
    public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.maxLength(25), Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.authService.emailSignIn(this.email.value, this.password.value);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get displayName() {
    return this.loginForm.get('displayName');
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a password' : '';
  }

  onLogout() {
    this.authService.signOut();
    // this.loginService.broadcastLogin(false);
  }

}
