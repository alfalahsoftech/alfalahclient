import { Component, OnInit } from '@angular/core'
import {RestSrvc} from '../srvc/srvc.service'
import { log } from 'util';
import { HttpClient } from '@angular/common/http';
@Component(
    {
        selector: 'orderHistory',
        templateUrl: 'orderHistory.html',
        styleUrls: ['orderHistory.css']
    }
)
export class OrderHistory implements OnInit {

    ordersArray: any[];

    constructor(private restSrvc:RestSrvc,private _httpClient:HttpClient) { }


    fetchData(){
        this.restSrvc.reqRespAjax('rest/food/orderHistory',null).subscribe((resp:any[])=>{
            this.ordersArray = resp;
        console.log(this.ordersArray);
        })
    }
    ngOnInit() {
        this.fetchData();
       // this.itemsArray = new DisplayItemsArray();
    }
    actions(order:any,type:string){
        const extParam={'isOrderBilling':true,'orderDayPK':order.primaryKey,'clientPK':order.clientPK};
        this.restSrvc.setExtraPram(extParam);
        console.log("clientPK= "+order.clientPK +' type =' +type);
    }
   
      isActive(isActive:any){
          return isActive == 1;
      }
}

export class DisplayItemsArray {
    itemID: string;
    name: string;
    weight: string;
    baseUnit: string;
    unitCost: string;
    gstPerc: string;
    costPrice: string;
    salingPrice: string;
    notes:string;
    isActive:string;
}