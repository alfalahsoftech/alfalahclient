import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
// import { HeroesComponent } from '../heroes/heroes.component';
// import { CustModalComponent, CustomerInfo } from '../cust-modal/cust-modal.component';
import { DatePipe } from '@angular/common'
import { Person } from '../service/person';
import { PeopleService } from "../service/CustomerSvcs"
import { Customer } from '../service/customer';
import { RestSrvc } from '../srvc/srvc.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit, AfterViewInit {
  mdlHeader = "Add New Client";
  custHeader: string = "List of customer";
  msg = "From cust";
  constructor(private router:Router,private peopleService: PeopleService, private restSrvc: RestSrvc) {
    this.router.events.subscribe((e: any) => {
      console.log('Routejjjjr event:kkkkkkk', e);
      this.clientDetails();
    });

   }

  isLoadingDone: boolean;
  ngAfterViewInit() {
    console.log(this.msg)
    this.clientDetails();

    this.isLoadingDone = true;
  }
  private custDetails = [];

  clientDetails() {
    this.restSrvc.getClientDetails().subscribe((res: any[]) => {
      this.custDetails = res;
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



  
  customerArray: Customer[];



  ngOnInit() {
    
    //this.customerArray = this.peopleService.getCustomers();

    //console.log(this.customerArray);

  
  }


}
