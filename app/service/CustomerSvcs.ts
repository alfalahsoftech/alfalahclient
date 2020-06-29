import { Injectable } from '@angular/core';
import { Person } from './person';
import {Customer } from "./customer";
// import { CustModalComponent } from '../cust-modal/cust-modal.component';
export const CUST=[
  {custID:'1234',custContact:13456789,custName:'Mahboob',lastOrderDate:new Date('12-19-2018'),noOfOrder:22,routeName:'Aurangabad'}
]
@Injectable()
export class PeopleService {
  constructor() { }

  getAll() : Person[] {
    return [
      {id: 1, name: 'Luke Skywalker', height: 177, weight: 70},
      {id: 2, name: 'Darth Vader', height: 200, weight: 100},
      {id: 3, name: 'Han Solo', height: 185, weight: 85},
    ];
  }

  get(id: String) : Customer {
    return CUST.find(p => p.custID === id);
  }
  getCustomers() : Customer[] {
    return [
      {custID:'1234',custContact:13456789,custName:'Mahboob',lastOrderDate:new Date('12-16-2018'),noOfOrder:22,routeName:'Aurangabad'}
    ];
  }
}

