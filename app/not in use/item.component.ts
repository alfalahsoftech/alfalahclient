import { Component, OnInit } from '@angular/core';
import { RestSrvc } from '../srvc/srvc.service';



@Component({
    selector: "item",
    templateUrl: "./item.component.html",
    styleUrls: ['./item.component.css']
})
export class Item implements OnInit {

    orderItemArray = [];
    constructor(private restSrvc: RestSrvc) { }

    ngOnInit() {
        this.fetchData();
        console.log(this.restSrvc.getExtraParam());
    }
    // Fetching Data
    fetchData() {
        this.restSrvc.reqRespAjax('rest/food/allItems', '').subscribe((resp: any[]) => {
            this.orderItemArray = resp;
        })
    }


    saveItem() {
        this.orderItemArray.forEach(element => {
            console.log(element)
        });
        this.restSrvc.extraParamAjax('rest/food/submitOrder',  this.orderItemArray,this.restSrvc.getExtraParam()).subscribe((resp: any[]) => {
            this.orderItemArray = resp;
        })
       
    }
}