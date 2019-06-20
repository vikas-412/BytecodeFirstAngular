import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ServerApiHitService} from '../../_services/server-api-hit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  message;

  constructor(private http: HttpClient, private SAHservice: ServerApiHitService, private fb: FormBuilder, private router: Router) { }  
  
  loginForm = this.fb.group({
    emailID: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(5)]]
  });

  ngOnInit() {
    let token = localStorage.getItem('token');
    console.log('this is token', token);
    if (token) {
      console.log('token is present');
      this.router.navigate(['/info'])
    }
  }
  
  get formControls(){
    return this.loginForm.controls
  }

  signup() {
    this.router.navigate(['/signup'])
    }

  submit() {
    this.submitted = true;
    console.log(this.submitted)
    if(this.loginForm.invalid){
      console.log(this.loginForm.status, 'Login form is invalid')
      return
    }
    else {
    console.log(this.loginForm.value);
    this.SAHservice.loginServer(this.loginForm.value).
      subscribe((res) => {
        console.log(res);
        let dataIn = JSON.stringify(res);
        let dataOut = JSON.parse(dataIn);
        if (dataOut.token && dataOut.success) {       
        localStorage.setItem('token', dataOut.token);
        localStorage.setItem('createdBy',dataOut._id);
        localStorage.setItem('name',dataOut.name)
        this.router.navigate(['/info']);
        } else {
          this.message=dataOut.message
        }
      })
    }
  }

}
