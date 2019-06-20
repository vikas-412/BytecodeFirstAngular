import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { ServerApiHitService } from '../../_services/server-api-hit.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showconfirmpasswarning;
  submitted = false;
  message;
  passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,}$"

  constructor(private http: HttpClient, private SAHservice: ServerApiHitService, private router: Router, private fb: FormBuilder) { }

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    emailID: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.passwordRegex)]]
  });

  ngOnInit() {
    this.submitted = false
    if (localStorage.getItem('token')) {
      this.router.navigate(['/info'])
    }
  }

  login() {
    this.router.navigate(['/login'])
  }

  confirmPassword() {
    if (this.signupForm.value.password === (<HTMLInputElement>document.getElementById('confirm_password')).value) {
      console.log('equal');
      this.showconfirmpasswarning = false
    } else this.showconfirmpasswarning = true
  }

  get formControls() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.submitted)
    if (this.signupForm.invalid) {
      console.log(this.signupForm.status, 'signup form is invalid')
      return
    }
    else {
      if (this.showconfirmpasswarning) {
        return
      } else {
        console.log(this.signupForm.value)
        this.SAHservice.signupServer(this.signupForm.value).
          subscribe((res) => {
            console.log(res);
            let dataIn = JSON.stringify(res);
            let dataOut = JSON.parse(dataIn);
            this.message = dataOut.message;
            if (dataOut.success) {
              setTimeout(() => this.router.navigate(['/login']), 2000)
            }
          })
      }
    }
  }

}
