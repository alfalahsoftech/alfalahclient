import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Form } from '@angular/forms';
// import { HeroesComponent } from '../heroes/heroes.component';
import { DatePipe } from '@angular/common'
import { Person } from '../service/person';
import { PeopleService } from "../service/CustomerSvcs"
import { Customer } from '../service/customer';
import { RestSrvc } from '../srvc/srvc.service';
import { Router } from '@angular/router';
import { pbkdf2 } from 'crypto';
import { EditUserInfo } from './editUserInfo';


@Component({
  selector: 'dispJobCode',
  templateUrl: './dispJobCode.html'
  // styleUrls: ['./dispRoutes.css']
})

export class DispJobCode implements OnInit {

  dynamicArray: Array<JC> = [];
  newDynamic :any={ jobCode: "", jobName: "", payRate: "", isActive: "" };

  constructor(private router: Router, private peopleService: PeopleService, private restSrvc: RestSrvc) { }


  getAllJobCode() {
    this.restSrvc.reqRespAjax('rest/settings/dispJobCode', null).subscribe((res: any[]) => {
      this.dynamicArray = res;
      console.log(this.dynamicArray)
    });
  }


  actions() {
    
    this.restSrvc.reqRespAjax('rest/settings/addJobCode', this.dynamicArray).subscribe((res: any[]) => {
      console.log(res)
    });
  }



  ngOnInit(): void {
    this.getAllJobCode();

    if( this.dynamicArray.length == 0){
      this.dynamicArray.push(this.newDynamic);
    }
  
   
  }

  addRow(index) {
    //this.newDynamic = { jobCode: "", jobName: "", payRate: "", isActive: "" };
    this.dynamicArray.push(this.newDynamic);
    // this.toastr.success('New row added successfully', 'New Row');  
    console.log(this.dynamicArray);
    return true;
  }

  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      //  this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
  }
}


export class JC {
  jobCode: string;
  jobName: string;
  payRate: string;
  isActive: boolean;
}