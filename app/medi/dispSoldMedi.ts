import { Component, OnInit } from '@angular/core'
import {RestSrvc} from '../srvc/srvc.service'
import { log } from 'util';
import { HttpClient } from '@angular/common/http';
@Component(
    {
        selector: 'dispSoldMedi',
        templateUrl: 'dispSoldMedi.html',
        styleUrls: ['dispSoldMedi.css']
    }
)
export class DispSoldMedi implements OnInit {

    itemsArray: any[];

    constructor(private restSrvc:RestSrvc,private _httpClient:HttpClient) { }


    fetchData(){
        this._httpClient.get(this.restSrvc.appBaseUrl+'rest/medi/dispSoldMedi').subscribe((resp:any[])=>{
            this.itemsArray = resp;
            console.log('dispSoldMedi=>>>>>>>>>>>>>');
            
        console.log(this.itemsArray);
        })
    }
    ngOnInit() {
        this.fetchData();
       // this.itemsArray = new DisplayItemsArray();
    }
    actions(pk:number,type:string){
        console.log("primaryKey= "+pk +' type =' +type);
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