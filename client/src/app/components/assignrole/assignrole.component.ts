import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
// import { Observable } from 'rxjs';
import {RolesService } from "../../_services/roles.service";

import { ServerApiHitService } from '../../_services/server-api-hit.service';

@Component({
  selector: 'app-assignrole',
  templateUrl: './assignrole.component.html',
  styleUrls: ['./assignrole.component.css']
})
export class AssignRoleComponent implements OnInit {

  constructor(private SAHservice: ServerApiHitService, private router: Router, private rolesService: RolesService) { }

  @Input() overlay;
  @Input() userInfo;
  @Output() overlayEvent = new EventEmitter();
  // @Output() rolesEvent = new EventEmitter();
  

  allRoles = [
    "User",
    "Admin",
    "SuperAdmin",
    "Customer",
    "Dealer"
  ]

  id;
  rolesAdded = [];
  rolesNotAdded = []; 

  ngOnInit() {
    console.log("----start--------")
    this.rolesAdded = [...this.userInfo.roles];
    this.id = this.userInfo.id;
    console.log('roles added', this.rolesAdded)
    if (this.rolesAdded[0]) {
      console.log("aaaaaaaaaaaaaa")
      this.rolesNotAdded = this.allRoles.filter(role => {
        console.log(role, 'role');
        return !this.rolesAdded.includes(role)
      })
    } else this.rolesNotAdded = [...this.allRoles]
    console.log("roles not added", this.rolesNotAdded)
    console.log("---end-----")
  }

  add(role, i) {
    this.rolesAdded.push(role);
    let newAdded = [...this.rolesAdded];
    this.rolesAdded = newAdded;
    this.rolesNotAdded.splice(i, 1);
    console.log("Success in adding", this.rolesAdded, this.rolesNotAdded);
  }

  remove(role, i) {
    this.rolesNotAdded.push(role);
    this.rolesAdded.splice(i, 1);
    console.log("Success in deleting", this.rolesAdded, this.rolesNotAdded)
  }

  toggleOverlay() {
    console.log("Done");
    let updateData = {
      id : this.id,
      roles : this.rolesAdded,
      createdBy : localStorage.getItem('createdBy')     
    }
    this.SAHservice.editrolesServer(updateData).
    subscribe(res=>{
      console.log(res);
      let dataIn = JSON.stringify(res);
      let dataOut = JSON.parse(dataIn);
      alert(dataOut.message);
      if (dataOut.success){
        // let datatopass = {
        //   roles : this.rolesAdded,
        //   id : this.id
        // }
        let datatopass = dataOut
        this.rolesService.setRoles(datatopass)
        this.overlay = false
        this.overlayEvent.emit(this.overlay);
        // this.rolesEvent.emit(this.rolesAdded);
      }
    })
  }

}
