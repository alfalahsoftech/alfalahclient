import { Component, OnInit } from '@angular/core'
import {RestSrvc} from '../srvc/srvc.service'
import { Router, ActivatedRoute } from '@angular/router';
import { log } from 'util';
@Component(
    {
        selector: 'dispMedicine',
        templateUrl: 'dispMedicine.html',
        styleUrls: ['dispMedicine.css']
    }
)
export class DispMedicine implements OnInit {

    constructor(private restSrvc:RestSrvc,private router:Router,private activatedRoute:ActivatedRoute) { }
  

    itemsArray: any[];
    clientsArray :any[];
    originalArray:any[];
    eoClient:number;
    url: string = 'rest/medi'+this.router.url;
    isClientItem:boolean=this.router.url == '/allClientItems'?true:false;

    
    fetchData(){
        console.log(this.router.url);
        // console.log(this.router.onSameUrlNavigation);
        this.restSrvc.getClientDetails().subscribe((res: any[]) => {
            this.clientsArray = res;
           
            console.log(this.clientsArray)
        });
        
        this.restSrvc.reqRespAjax(this.url,'').subscribe((resp:any[])=>{
            this.itemsArray = resp;
            this.originalArray = resp;
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
    receiveMessage($event: DisplayItemsArray) {
       
        console.log($event);
        this.itemsArray.push($event);
        console.log(this.itemsArray);
      }
      isActive(isActive:any){
          return isActive == 1;
      }
     
      selectionChanged(ev){
        console.log(ev.value);
        if(ev.value == undefined){
            this.itemsArray = this.originalArray;
        }
        this.eoClient = ev.value.primaryKey;
        this.itemsArray = this.originalArray.filter(item=> item.clientName==ev.value.clientName)
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