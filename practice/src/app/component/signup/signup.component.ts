import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, endpoints } from 'src/app/Config/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm: FormGroup;
  err: string | null = null;
  loading: boolean = false;
  avatar: File | null | undefined = null;

  constructor(private fb: FormBuilder, private Apis:ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.confirmPass) {
      return;
    }

    this.loading = true;

    const formData = new FormData();
    for (const field in this.registerForm.value) {
      if (field !== 'confirmPass') {
        formData.append(field, this.registerForm.value[field]);
      }
    }

    if (this.avatar) {
      formData.append('avatar', this.avatar);
    }

    this.Apis.post(endpoints.register, formData)
      .subscribe(
        (response) => {
          console.log(response)
          this.router.navigate(['/login'])
        }
      );
      console.log(formData)
  }

  onFileChange(event: Event) {
    this.avatar = (event.target as HTMLInputElement).files?.[0];
  }
}
