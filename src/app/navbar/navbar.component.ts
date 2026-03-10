import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }
  form: any = {
    data: {},
      message: '',
      success: ''
  }
  isLogin() {
    let check = localStorage.getItem('firstName');
    if (check != null && check != undefined && check != '' && check != 'null') {
      this.form.data.firstName = check;
      this.form.data.roleName = localStorage.getItem('roleName');
      this.form.data.id = localStorage.getItem('id');
      return true;

    } else {
      return false;
    }
  }

  logout() {
    let self = this;
    localStorage.clear();
    self.form.message = 'You have been logged out successfully.';
    self.form.success = true;
    this.router.navigateByUrl('/login?message=Logout successfully');
  }
}
