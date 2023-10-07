import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, endpoints } from 'src/app/Config/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    avatar: new FormControl(''),
  });

  constructor(
    private apis: ApiService,
    private router: Router
  ) { }

  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupForm.patchValue({
        avatar: file
      });
    }
  }

  onSubmit(){
    if(this.signupForm.valid){
      try{
        this.apis.post(endpoints.register, this.signupForm.value).subscribe((data) => {
          console.log(data)
        });
      }catch(error)
      {
        console.log(error);
      }
     
    }
  }
}
