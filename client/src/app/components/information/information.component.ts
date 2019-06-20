import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { ServerApiHitService } from '../../_services/server-api-hit.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  query;
  name;
  loggedIn = false;
  submitted = false;
  message;
  notImage = false;
  notImageMessage;
  imagePath;
  imgResponse;
  serverImgName;
  url;
  tokenobj = {
    token: localStorage.getItem('token'),
  };

  constructor(private fb: FormBuilder, private SAHservice: ServerApiHitService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  infoForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    emailID: ['', [Validators.required, Validators.email]],
    hobbies: this.fb.group({
      music: [false],
      books: [false],
      sports: [false],
      cycling: [false]
    }),
    gender: ['', Validators.required],
    jobPost: ['', Validators.required],
    fatherName: ['', [Validators.required, Validators.minLength(3)]],
    phoneNo: ['', [Validators.required, Validators.minLength(6)]],
    dob: ['', Validators.required],
    createDate: [''],
    updateDate: [''],
    createdBy: [''],
    imgName: [''],
    roles: [[]]
  })

  ngOnInit() {
    this.submitted = false
    this.name = localStorage.getItem('name')
    this.route.queryParamMap.subscribe(queryParams => {
      this.query = queryParams.get("id")
    })
    if (this.query) {
      console.log(this.query);
      let datatopass = {
        id: this.query,
        token: this.tokenobj.token
      }
      this.SAHservice.singleinfoServer(datatopass).
        subscribe(res => {
          console.log(res, "qwqwq");
          let dataIn = JSON.stringify(res);
          let dataOut = JSON.parse(dataIn);
          this.message = dataOut.message;
          this.infoForm.patchValue(dataOut.info);
          this.url = `http://localhost:3200/images/${dataOut.info.imgName}`
        })
    } else console.log("No query")
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('createdBy');
    localStorage.removeItem('name');
    this.submitted = false;
    this.loggedIn = false;
    this.router.navigate(['/login'])
  }

  allinfo() {
    console.log("Go to all info");
    this.router.navigate(['/allinfo'])
  }

  get formControls() {
    return this.infoForm.controls;
  }

  runEdit() {
    this.infoForm.patchValue({
      createdBy: localStorage.getItem('createdBy'),
      updateDate: new Date(),
      imgName: this.serverImgName
    })

    let sendinfo = { ...this.infoForm.value, ...this.tokenobj };
    console.log(sendinfo);

    this.SAHservice.editinfoServer(sendinfo).
      subscribe((res) => {
        console.log(res);
        let dataIn = JSON.stringify(res);
        let dataOut = JSON.parse(dataIn);
        if (dataOut.success) {
          this.message = dataOut.message + ' Going to the page containing all information...';
          console.log(this.message)
          setTimeout(() => this.router.navigate(['/allinfo']), 3000)
        } else this.message = dataOut.message;
      })
  }

  runAdd() {
    debugger
    this.infoForm.patchValue({
      createDate: new Date,
      createdBy: localStorage.getItem('createdBy'),
      updateDate: '',
      imgName: this.serverImgName
    })
    debugger;

    let sendinfo = { ...this.infoForm.value, ...this.tokenobj };
    console.log(sendinfo,"before add");

    this.SAHservice.infoServer(sendinfo).
      subscribe((res) => {
        console.log(res);
        let dataIn = JSON.stringify(res);
        let dataOut = JSON.parse(dataIn);
        if (dataOut.success) {
          this.message = dataOut.message + ' Going to the page containing all information...';
          console.log(this.message)
          setTimeout(() => this.router.navigate(['/allinfo']), 3000)
        } else this.message = dataOut.message;
      })
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.submitted)
    if (this.infoForm.invalid) {
      console.log('Invalid info');
      return;
    }
    else {debugger
      this.onUpload().then((res) => {
        console.log(res,"Image response---here--------")
        let dataInImg = JSON.stringify(res);
        let dataOutImg = JSON.parse(dataInImg);
        console.log("Image upload response status", dataOutImg.success);
        this.imgResponse = dataOutImg.success;
        if (this.imgResponse) {
          this.serverImgName = dataOutImg.imgName;
          console.log("Image uploaded",this.serverImgName,"--------")
          if (this.query) this.runEdit()
          else this.runAdd()
        } else {
          alert("Error in uploading image, Try again...");
        }
      })
    }
  }

  addedByMe() {
    this.http.post('http://localhost:3200/myinfo', { createdBy: localStorage.getItem('createdBy') }).
      subscribe(res => console.log(res))
  }

  // onFileChange(event){
  //   this.selectedFile = event.target.files[0];
  // }

  onFileChange(event) { // called each time file input changes
    // ;

    //----check if image---
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.notImageMessage = "Only images are supported.";
      this.notImage = true;
      return;
    }
    //-----check ends-----

    if (event.target.files && event.target.files[0]) {
      this.notImage = false;
      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result; //add source to image

      }
    }
  }

  onUpload() {
    const uploadData = new FormData();
    if (!this.notImage && this.imagePath && this.imagePath[0]) {
      uploadData.append('lalu', this.imagePath[0], this.imagePath[0].name);
      return new Promise(resolve => {
        this.SAHservice.imageUpload(uploadData).
        subscribe(res => {
          ;
          // let dataInImg = JSON.stringify(res);
          // let dataOutImg = JSON.parse(dataInImg);
          // console.log("Image upload response status", dataOutImg.success);
          resolve(res)
          // if (dataOutImg.success){
          //   this.serverImgName = dataOutImg.imgName;
          // }
          // resolve(dataOutImg.success)
        })
      })
    } else {
      this.notImage = true
      this.notImageMessage = "Please select a file first"
    }
  }
  // ngOnDestroy(){
  //   this.submitted = false
  // }

}
