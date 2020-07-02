import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { PeopleService } from "../service/CustomerSvcs"
import { Customer } from '../service/customer';
import { RestSrvc } from '../srvc/srvc.service';
import {Router} from '@angular/router';
import { pbkdf2 } from 'crypto';



@Component({
  selector: 'dailyStuff',
  templateUrl: './dailyStuff.html',
  styleUrls: ['./dailyStuff.css']
})

export class DailyStuff implements OnInit, AfterViewInit {

  custHeader: string = "List of customer";
  uiDailyStuff:UIDailyStuff=new UIDailyStuff;
  customerArray: Customer[];
  private dailyStuffs = [];
  staffArray:any = [];
  ttLabour:number=0;
  constructor(private router:Router,private peopleService: PeopleService, private restSrvc: RestSrvc) { }
  

page = 1;
pageSize = 10;
collectionSize = this.dailyStuffs.length;

get arrayOfData(): any[] {
  return this.dailyStuffs
    .map((obj, i) => ({id: i + 1, ...obj}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
}
  addDailyStuff(){
    console.log(this.uiDailyStuff);

    this.restSrvc.reqRespAjax('rest/food/addDailyStuff',this.uiDailyStuff).subscribe((res: any[]) => {
      this.getDailyStuffData();
      //this.dailyStuffs.push(res)
      console.log(res)
    });
    
    this.router.navigate(['/dispDailyStuff']);
  }
  selectionChanged(event:any){
    this.uiDailyStuff.eoStore = event.value.primaryKey;
  }

  ngAfterViewInit() {
    this.getDailyStuffData();
    this.getStoreDetails();
    this.getAllStaff();
  }
  

  getDailyStuffData() {
    this.restSrvc.reqRespAjax('rest/food/dispDailyStuff',null).subscribe((res: any[]) => {
      this.dailyStuffs = res;
      console.log(this.dailyStuffs)
    });
  }
  private storeArray:any = [];

  getStoreDetails() {
    this.restSrvc.reqRespAjax("rest/settings/dispStore",null).subscribe((res: any[]) => {
      this.storeArray = res;

    });
  }
  getAllStaff() {
    this.restSrvc.reqRespAjax('rest/UserService/dispStaff', null).subscribe((res: any[]) => {
      this.staffArray = res;
      this.ttLabour = this.staffArray.length;
    });
  }
  /**
   * openMdl
   */
  public openMdl() {
    // this.cust.callByOtherComp();
    console.log('Open called')
  }
 

  ngOnInit() {
  }



}

//////////////////////////////////////////////////////////////////////////////////////////////

export class UIDailyStuff{
  closeDayReason:string;
  createdDate:string;
  isCloseDay:number;
  eoStore:string;

}
