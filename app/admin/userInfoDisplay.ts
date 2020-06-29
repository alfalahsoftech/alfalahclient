import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Form } from '@angular/forms';
// import { HeroesComponent } from '../heroes/heroes.component';
import { DatePipe } from '@angular/common'
import { Person } from '../service/person';
import { PeopleService } from "../service/CustomerSvcs"
import { Customer } from '../service/customer';
import { RestSrvc } from '../srvc/srvc.service';
import {Router} from '@angular/router';
import { pbkdf2 } from 'crypto';
import { EditUserInfo } from './editUserInfo';


@Component({
  selector: 'user-info-display',
  templateUrl: './userInfoDisplay.html',
  styleUrls: ['./userInfoDisplay.css']
})

export class UserInfoDisplay implements OnInit, AfterViewInit {
  // private custmdl:CustModalComponent;
  mdlHeader = "Add New User";
  @ViewChild(EditUserInfo) 
  private editUserInfo: EditUserInfo;
 
  constructor(private router:Router,private peopleService: PeopleService, private restSrvc: RestSrvc) { }

  isLoadingDone: boolean;
  ngAfterViewInit() {
    console.log('ngAfterViewInit-userinfodisp')
    console.log( this.editUserInfo)
     //
    this.getUserDetails();
    
    this.isLoadingDone = true;
  }
  
  private userDetails = [];

  getUserDetails() {
    this.restSrvc.reqRespAjax('rest/UserService/allUsers',null).subscribe((res: any[]) => {
      this.userDetails = res;
      console.log(this.userDetails)
    });
  }

  

  /**
   * openMdl
   */
  public openMdl() {
    // this.cust.callByOtherComp();
    console.log('Open called')
  }
  custHeader: string = "List of customer";

  receiveMessage($event) {
    console.log('receiveMessage called from userinfodisplay.ts')
    this.router.navigate(['/user']);
    this.userDetails.push($event);
    console.log($event);
  }



  
  customerArray: Customer[];



  ngOnInit() {
    //this.customerArray = this.peopleService.getCustomers();

    //console.log(this.customerArray);

  }

  actions(actionType:any){
    this.editUserInfo.getData('calling from parent UserInfoDisplay');
  }


}

export class UserInfo{
  userName:string;
  userPassword:string;
  firstName:string;
  lastName:string;
  address:string;
  emailID:string;
  contactNo:number;

}
