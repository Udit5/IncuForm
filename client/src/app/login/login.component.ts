import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  success = false;
  result = '';

  constructor(
    private formbuilder: FormBuilder,
    private loginServices: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onlogin = () => {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginServices.login(this.loginForm.value).subscribe((user) => {
      this.success = true;
      this.submitted = false;
      localStorage.setItem('token', user.token);
      this.loginForm.reset();

      if (localStorage.getItem('token')) {
        this.router.navigateByUrl('submission');
      }
    });
  };
}
