import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private loginServices: LoginService, private router: Router) {}
  isLogged = false;

  ngOnInit(): void {}
  onlogout = () => {
    localStorage.removeItem('token');
    this.loginServices.logout().subscribe();
    this.router.navigateByUrl('');
  };

  isLoggedIn = () => {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  };
}
