import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Form } from '@angular/forms';
// import { HeroesComponent } from '../heroes/heroes.component';
// import { CustModalComponent, CustomerInfo } from '../cust-modal/cust-modal.component';
import { DatePipe } from '@angular/common'
import { Person } from '../service/person';
import { PeopleService } from "../service/CustomerSvcs"
import { Customer } from '../service/customer';
import { RestSrvc } from '../srvc/srvc.service';
import {Router} from '@angular/router';
import { pbkdf2 } from 'crypto';
import { EditStoreMdl } from './editStoreMdl';

@Component({
  selector: 'displayStoreInfo',
  templateUrl: './displayStoreInfo.html',
  styleUrls: ['./displayStoreInfo.css']
})

export class DisplayStoreInfo implements OnInit, AfterViewInit {
  // private custmdl:CustModalComponent;
  mdlHeader = "Add New Staff";
  @ViewChild(EditStoreMdl) 
  private editUserInfo: EditStoreMdl;
 
 
  constructor(private router:Router,private peopleService: PeopleService, private restSrvc: RestSrvc) { }
url:string="rest/settings"
  isLoadingDone: boolean;
  ngAfterViewInit() {
    console.log( this.editUserInfo)
     //
    this.getStoreDetails();
    
    this.isLoadingDone = true;
  }
  
  private storeDetails = [];

  getStoreDetails() {
    this.restSrvc.reqRespAjax(this.url+"/dispStore",null).subscribe((res: any[]) => {
      this.storeDetails = res;
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
    this.router.navigate(['/dispStore']);
    // this.clientDetails();
    this.storeDetails.push($event);
    console.log($event);
  }



  
  customerArray: Customer[];



  ngOnInit() {
    //this.customerArray = this.peopleService.getCustomers();

    //console.log(this.customerArray);

  }

  actions(pk:any){
    this.restSrvc.reqRespAjax(this.url+"/delete",this.restSrvc.getDeleteJson('EOStore',pk)).subscribe((res: any[]) => {
      this.getStoreDetails()
      console.log(this.storeDetails)
    });
  }


}

export class UserInfo{
  userName:string;
  // userPassword:string;
  firstName:string;
  lastName:string;
  address:string;
  // emailID:string;
  contactNo:number;
  isActive:boolean=false;

}
