import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/authservice/auth';
import { Router } from '@angular/router';
import { SafeStorageService } from '../../services/storageservice/storage';
@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  userForm!: FormGroup;
  authservice = inject(Auth);
  router = inject(Router)
  loginErrormsg: string | undefined;
  storage_ = inject(SafeStorageService);

  constructor(private formbuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submit() {
    if (this.userForm.valid) {
      const body = this.userForm.value;
      this.authservice.login(body).subscribe(
        (res: any) => {
          const isLoggedIn = res?.isLoggedIn;
          this.storage_.setItem("isLoggedIn", isLoggedIn);
          this.router.navigate(['/admin']);
        },
        ((err) => {
          // console.log("error while login : ", err);
          this.loginErrormsg = err?.error?.message;
        }));
      // console.log(this.userForm.value)
    } else {
      console.log("form not valid");
      this.userForm.markAllAsTouched();
    }
  }
}
