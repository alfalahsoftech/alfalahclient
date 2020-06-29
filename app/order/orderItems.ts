import { Component, OnInit } from '@angular/core';
import { RestSrvc } from '../srvc/srvc.service';



@Component({
    selector: "orderItems",
    templateUrl: "./orderItems.html",
    styleUrls: ['./orderItems.css']
})
export class OrderItems implements OnInit {

    orderItemArray = [];
    constructor(private restSrvc: RestSrvc) { }
    clientName:string='';
    ngOnInit() {
        this.fetchData();
        const extraparam =this.restSrvc.getExtraParam();
        this.clientName =extraparam['clientName'];
        console.log(extraparam);
    }
    // Fetching Data
    fetchData() {
        this.restSrvc.reqRespAjax('rest/food/clientWiseItems',this.restSrvc.getExtraParam() ).subscribe((resp: any[]) => {
            this.orderItemArray = resp;
            console.log( this.orderItemArray);
        })
    }


    saveItem() {
        const actualOrderedItems=[];
        this.orderItemArray.forEach(element => {
            console.log(element)
            if(element.quantity != 0){
            actualOrderedItems.push(element);
            }
            console.log(actualOrderedItems);
        });
       var b= confirm('Are you sure you want to submit order?');
       
       if(b==true){
        this.restSrvc.extraParamAjax('rest/food/submitOrder',  actualOrderedItems,this.restSrvc.getExtraParam()).subscribe((resp: any[]) => {
            const response = resp;
            alert(response);
         })
       }else{
           console.log('Order not submitted!!')
       }
       
       
    }
}