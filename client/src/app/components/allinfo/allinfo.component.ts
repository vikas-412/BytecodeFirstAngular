import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { RolesService } from '../../_services/roles.service';

import { ServerApiHitService } from '../../_services/server-api-hit.service';

@Component({
  selector: 'app-allinfo',
  templateUrl: './allinfo.component.html',
  styleUrls: ['./allinfo.component.css']
})
export class AllinfoComponent implements OnInit {

  subscription : Subscription;
  infodata: any[];
  isInfoPresent;
  userInfo;
  overlay =false;
  public sortBy = "name";
  public rowsOnPage = 5;
  public sortOrder = "asc"
  tokenobj = {
    token: localStorage.getItem('token')
  }
  createdBy = localStorage.getItem('createdBy');

  constructor(private http: HttpClient, private router: Router, private SAHservice: ServerApiHitService, private rolesService: RolesService) { }

  ngOnInit() {
    if (!this.tokenobj.token) {
      alert('Login to view all the information');
      this.router.navigate(['/login']);
      console.log('code1 after the navigate command')
    }
    else {
      console.log('code2 after the navigate command');
      this.SAHservice.allinfoServer(this.tokenobj).
        subscribe((res) => {
          console.log(res);
          let dataIn = JSON.stringify(res);
          let dataOut = JSON.parse(dataIn);
          if (dataOut.success) {
            let datafromhobbies = this.displayHobbies(dataOut.infodata);
            let length = dataOut.infodata.length;
            this.infodata= datafromhobbies;            
            this.subscription = this.rolesService.roles.subscribe((datagot)=>{
              let datagotIn = JSON.stringify(datagot);
              let datagotOut = JSON.parse(datagotIn);
              this.infodata = this.displayHobbies(datagotOut.infodata);
              // this.infodata = datafromhobbies.map((info)=>{
              //   if (datagotOut.id===info._id){
              //     return { ...info, roles: datagotOut.roles}
              //   } else return info
              // })
            })
            this.isInfoPresent = Boolean(length);
            if (!this.isInfoPresent) {
              alert('No information present. Fill the form to view information.')
              this.router.navigate(['/info']);
            }
          } else alert(dataOut.message);
        })
    }
  }

  displayHobbies(dataOut) {
    let dataFinal = dataOut.map((info) => {
      let array = []
      for (let [key, value] of Object.entries(info.hobbies)) {
        if (value) array.push(key);
      }

      return { ...info, hobbies: array }
    })
    return dataFinal;
  }

  addNew() {
    this.router.navigate(['/info'])
  }

  edit(item) {
    console.log(item, 'edit item');
    this.router.navigate(['/info'], { queryParams: { id: item._id } });
    // this.router.navigate([`/info?query=${item.emailID}`])
  }

  editRole(item){
    console.log('Edit role button clicked');
    this.overlay=true;
    this.userInfo={
      id: item._id,
      roles : item.roles
    }
    console.log(this.userInfo);    
  }

  delete(item) {
    let confirmation = confirm("Are you sure, you want to delete the information ?");
    if (confirmation) {
      console.log('confirmed');
      console.log(item, 'delete item');
      if (this.createdBy === item.createdBy) {
        console.log('DELETE IT!!!!!!!');
        let deleteData = {
          emailID: item.emailID,
          token: this.tokenobj.token
        }
        // this.infodata.splice(i,1);
        // item.hidden = true
        this.SAHservice.deleteinfoServer(deleteData).
          subscribe((res) => {
            console.log(res);
            let dataIn = JSON.stringify(res);
            let dataOut = JSON.parse(dataIn);
            if (dataOut.success) {
              alert(dataOut.message);
              let filtered = this.infodata.filter((val) => {
                if (val.emailID !== item.emailID) {
                  return true;
                } else return false
              });
              this.infodata = filtered;

            } else {
              alert(dataOut.message);
            }
          })
      } else alert('You can only delete information added by you.')
    }
    else console.log('Denied')
  }

}
