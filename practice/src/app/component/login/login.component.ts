import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { AuthApiService, endpointsAuth } from 'src/app/Config/auth-api.service';
import { login } from 'src/app/Reducer/MyUserReducer/state.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    taiKhoan: new FormControl(''),
    matKhau: new FormControl('')
  });

  constructor(
    private cookie:CookieService,
    private apis: ApiService,
    private authApi: AuthApiService,
    private router: Router,
    private store: Store
  ) { }

  onSubmit() {
    if(this.loginForm.valid){
      try{
        this.apis.login(endpoints.login, this.loginForm.value).subscribe((data) => {
          this.cookie.set('token', data.toString())
        })
        this.authApi.get(endpointsAuth.currentUser).subscribe((data) => {
          this.cookie.set('user', JSON.stringify(data))
          this.store.dispatch(login({payload: data}))
        })
        if(this.cookie.check('user') == true)
        {
          this.router.navigate(['/']);
          alert("Bạn đã đăng nhập thành công")
        } else 
        {
          alert("Hãy thử lại lần nữa")
        }
      }catch(error)
      {
        console.log(error);
      }
     
    }
    
  }
}
