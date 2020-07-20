import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
// import { HeroesComponent } from '../heroes/heroes.component';
// import { CustModalComponent, CustomerInfo } from '../cust-modal/cust-modal.component';
import { DatePipe } from '@angular/common'
import { Person } from '../service/person';
import { PeopleService } from "../service/CustomerSvcs"
import { Customer } from '../service/customer';
import { RestSrvc } from '../srvc/srvc.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit, AfterViewInit {
  mdlHeader = "Add New Client";
  custHeader: string = "List of customer";
  msg = "From cust";
  private custDetails = [];

  constructor(private router: Router, private peopleService: PeopleService, private restSrvc: RestSrvc) {
    this.router.events.subscribe((e: any) => {
      console.log('Routejjjjr event:kkkkkkk', e);
      this.clientDetails();
    });

  }

  page = 1;
  pageSize = 10;
  recordFrom = 1;
  recordTo = this.pageSize;
  noOfItems = this.custDetails.length;

  get arrayOfData(): any[] {
    if (this.noOfItems > 0) {
      if (this.page == 1) {
        this.recordFrom = this.page;
        this.recordTo = this.pageSize > this.noOfItems ? this.noOfItems : this.pageSize;
      } else {
        this.recordFrom = this.pageSize * (this.page - 1) + 1;
        this.recordTo = this.pageSize * this.page > this.noOfItems ? this.noOfItems : this.pageSize * this.page;
      }
    } else {
      this.recordFrom = 0;
      this.recordTo = 0;
    }

    return this.custDetails
      .map((obj, i) => ({ id: i + 1, ...obj }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }



  ngAfterViewInit() {
    console.log(this.msg)
    // this.clientDetails();
  }

  clientDetails() {
    this.restSrvc.getClientDetails().subscribe((res: any[]) => {
      this.custDetails = res;
      this.noOfItems = this.custDetails.length;
      // this.custDetails.push()
      console.log(this.custDetails)
    });
  }

  receiveMessage($event) {
    this.router.navigate(['/cli']);
    // this.clientDetails();
    //this.custDetails.push($event);
    console.log($event);
  }

  ngOnInit() {
    this.clientDetails();
    //this.customerArray = this.peopleService.getCustomers();

    //console.log(this.customerArray);


  }


}
