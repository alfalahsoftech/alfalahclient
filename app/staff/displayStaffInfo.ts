import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Form } from '@angular/forms';
// import { HeroesComponent } from '../heroes/heroes.component';
// import { CustModalComponent, CustomerInfo } from '../cust-modal/cust-modal.component';
import { DatePipe } from '@angular/common'
import { Person } from '../service/person';
import { PeopleService } from "../service/CustomerSvcs"
import { Customer } from '../service/customer';
import { RestSrvc } from '../srvc/srvc.service';
import { Router } from '@angular/router';
import { pbkdf2 } from 'crypto';
import { EditStaffInfo } from './editStaffMdl';


@Component({
  selector: 'displayStaffInfo',
  templateUrl: './displayStaffInfo.html',
  styleUrls: ['./displayStaffInfo.css']
})

export class DisplayStaffInfo implements OnInit, AfterViewInit {
  // private custmdl:CustModalComponent;
  mdlHeader = "Add New Staff";
  @ViewChild(EditStaffInfo)
  private editUserInfo: EditStaffInfo;


  constructor(private router: Router, private peopleService: PeopleService, private restSrvc: RestSrvc) { }

  isLoadingDone: boolean;
  ngAfterViewInit() {
    console.log(this.editUserInfo)
    //
    this.getUserDetails();

    this.isLoadingDone = true;
  }

  private userDetails = [];

  getUserDetails() {
    this.restSrvc.reqRespAjax('rest/UserService/dispStaff', null).subscribe((res: any[]) => {
      this.userDetails = res;
      // this.custDetails.push()
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
    this.router.navigate(['/dispStaff']);
    // this.clientDetails();
    this.userDetails.push($event);
    console.log($event);
  }




  customerArray: Customer[];



  ngOnInit() {
    //this.customerArray = this.peopleService.getCustomers();

    //console.log(this.customerArray);

  }

  actions(pk: any) {
    this.restSrvc.reqRespAjax("rest/settings/delete", this.restSrvc.getDeleteJson('EOStaff', pk)).subscribe((res: any[]) => {
      this.getUserDetails()

    });
  }
}



export class UserInfo {
  userName: string;
  // userPassword:string;
  firstName: string;
  lastName: string;
  address: string;
 storeName:string;
  contactNo: number;
  isActive: number;


}
