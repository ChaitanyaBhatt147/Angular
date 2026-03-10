import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  endpoint = 'http://localhost:8081/Auth/login'
  constructor(private httpService: HttpServiceService, private router: Router, private activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      if (params['message']) {
        this.form.message = params['message'];
        this.form.success = true;
      }
    })
  }

  form: any = {
    data: {},
    message: '',
    success: '',
    inputerror: {}
  }

  signIn() {
    let self = this;
    console.log('form data== ', this.form.data);
    this.httpService.post(this.endpoint, this.form.data, function (response: any) {
      console.log('response ====== ', response)

      if (!response.success && response.result.inputerror) {
        self.form.inputerror = response.result.inputerror;
      }

      if (response.success) {
        localStorage.setItem('firstName', response.result.data.firstName);
        localStorage.setItem('roleName', response.result.data.roleName);
        localStorage.setItem('id', response.result.data.id);
        self.router.navigateByUrl('/welcome');
      }

      self.form.message = response.result.message;
      self.form.success = response.success;
    })
  }

}
