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
  selector: 'dispRoutes',
  templateUrl: './dispRoutes.html',
  styleUrls: ['./dispRoutes.css']
})

export class DisplayRoutes implements OnInit, AfterViewInit {
  // private custmdl:CustModalComponent;
  // mdlHeader = "Add New User";
  @ViewChild(EditUserInfo) 
  private editUserInfo: EditUserInfo;
 
  constructor(private router:Router,private peopleService: PeopleService, private restSrvc: RestSrvc) { }

  isLoadingDone: boolean;
  ngAfterViewInit() {
    console.log('ngAfterViewInit-userinfodisp')
    console.log( this.editUserInfo)
     //
    this.getAllData();
    
    this.isLoadingDone = true;
  }
  
  private routesArray = [];

  getAllData() {
    this.restSrvc.reqRespAjax('rest/food/allRoutes',null).subscribe((res: any[]) => {
      this.routesArray = res;
      console.log(this.routesArray)
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
    this.router.navigate(['/route']);
    this.routesArray.push($event);
    console.log($event);
  }



  
  customerArray: Customer[];



  ngOnInit() {
   
  }

  actions(actionType:any){
    this.editUserInfo.getData('calling from parent UserInfoDisplay');
  }


}

