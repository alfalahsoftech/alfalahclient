import { Component, OnInit } from '@angular/core'
import {RestSrvc} from '../srvc/srvc.service'

import { log } from 'util';
@Component(
    {
        selector: 'addClientItem',
        templateUrl: 'addClientItem.html',
        styleUrls: ['addClientItem.css']
    }
)
export class AddClientItem implements OnInit {

    itemsArray: any[];
    clientsArray :any[];
    eoClient:number;
    clientName:string;
    constructor(private restSrvc:RestSrvc) { }


    fetchData(){
        this.restSrvc.reqRespAjax('rest/food/allItems','').subscribe((resp:any[])=>{
            this.itemsArray = resp;
        console.log(this.itemsArray);
        })
        this.clientDetails();
    }
    ngOnInit() {
        this.fetchData();
       // this.itemsArray = new DisplayItemsArray();
    }
    actions(){
        console.log(this.eoClient);
        
        console.log(this.itemsArray);
        var finalArrray = [];
        this.itemsArray.forEach(item=>{
            if(item.isActive == true){
                item.isActive = 1;
                finalArrray.push(item);
                
            }
            
        });
       
        
        console.log(finalArrray)
        const extra = {clientPK:this.eoClient};
        this.restSrvc.extraParamAjax('rest/food/addCliItems',finalArrray,extra).subscribe((resp:any[])=>{
           alert("Scuccessfully added " +finalArrray.length + ' items for client ' +this.clientName);
           for (let index = 0; index < this.itemsArray.length; index++) {
            this.itemsArray[index].isActive = false;    
        }
        })
    }
    receiveMessage($event: DisplayItemsArray) {
       
        console.log($event);
        this.itemsArray.push($event);
        console.log(this.itemsArray);
      }
      isActive(isActive:any){
          return isActive == 1;
      }

      clientDetails() {
        this.restSrvc.getClientDetails().subscribe((res: any[]) => {
            this.clientsArray = res;
            console.log(this.clientsArray)
        });
    }
    selectionChanged(ev){
        console.log(ev.value);
        this.eoClient = ev.value.primaryKey;
        this.clientName = ev.value.clientName;
        console.log(this.eoClient);
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