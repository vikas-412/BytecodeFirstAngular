import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServerApiHitService {

  constructor(private http: HttpClient) { }

  signupServer = (signupData) => {
    return this.http.post(`${environment.serverhome}/signup`, signupData)
  }
  loginServer(loginData) {
    return this.http.post(`${environment.serverhome}/login`, loginData)
  }
  infoServer(infoData) {
    return this.http.post(`${environment.serverhome}/addinfo`, infoData)
  }
  allinfoServer = (allinfoData) => {
    return this.http.post(`${environment.serverhome}/allinfo`, allinfoData)
  }
  deleteinfoServer = (deleteData) => {
    return this.http.post(`${environment.serverhome}/deleteinfo`, deleteData)
  }
  singleinfoServer(infoData) {
    return this.http.post(`${environment.serverhome}/getsingleinfo`, infoData)
  }
  editinfoServer(updateData) {
    return this.http.post(`${environment.serverhome}/editinfo`, updateData)
  }
  editrolesServer(updateData){
    return this.http.post(`${environment.serverhome}/editrole`,updateData)
  }
  imageUpload(uploadData){
    return this.http.post(`${environment.serverhome}/images`,uploadData)
  }

}
