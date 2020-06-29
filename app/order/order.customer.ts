import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
// import { HeroesComponent } from '../heroes/heroes.component';
// import { CustModalComponent, CustomerInfo } from '../cust-modal/cust-modal.component';
import { DatePipe } from '@angular/common'
import { Person } from '../service/person';
import { PeopleService } from "../service/CustomerSvcs"
import { Customer } from '../service/customer';
import { RestSrvc } from '../srvc/srvc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-customer',
  templateUrl: './order.customer.html',
  styleUrls: ['./order.customer.css']
})

export class OrderCustomer implements OnInit, AfterViewInit {
  // private custmdl:CustModalComponent;
  mdlHeader = "Add New Client";
  // @ViewChild(CustModalComponent) cust: CustModalComponent;
  msg = "From cust";
  constructor(private router: Router, private peopleService: PeopleService, private restSrvc: RestSrvc, private activatedtRoute: ActivatedRoute) { }

  isLoadingDone: boolean;
  ngAfterViewInit() {

    this.activatedtRoute.paramMap.subscribe(param => {
      this.routePK = param.get('routePK');
      console.log('routePK==>' + this.routePK)
    })
    this.getAllData();
    this.isLoadingDone = true;
  }
  private routePK: string;
  private custDetails = [];

  getAllData() {
    this.restSrvc.reqRespAjax("rest/food/orderClient/" + this.routePK, null).subscribe((res: any[]) => {
      this.custDetails = res;

    });
    console.log('this.routePK====' + this.routePK)

    console.log(' this.custDetails===================' + this.custDetails);
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
    this.router.navigate(['/cli']);
    // this.clientDetails();
    //this.custDetails.push($event);
    console.log($event);
  }




  customerArray: Customer[];



  ngOnInit() {
    this.activatedtRoute.paramMap.subscribe(param => {
      this.routePK = param.get('routePK');
      console.log('routePK==>' + this.routePK)
    })
    this.getAllData();

    //this.customerArray = this.peopleService.getCustomers();

    //console.log(this.customerArray);

  }

  actions(clientPK: any, clientName: any) {
    console.log('actionType=====>' + clientPK);
    const data = { 'routePK': this.routePK, 'clientPK': clientPK, 'clientName': clientName };
    this.restSrvc.setExtraPram(data);
  }


}
