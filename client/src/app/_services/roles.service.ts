import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }

  public roles = new Subject();

  setRoles(value){
    this.roles.next(value)
  }

}
