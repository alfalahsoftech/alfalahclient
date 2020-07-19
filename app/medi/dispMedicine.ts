import { Component, OnInit, AfterViewInit } from '@angular/core'
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
export class DispMedicine implements OnInit ,AfterViewInit{

    constructor(private restSrvc:RestSrvc,private router:Router,private activatedRoute:ActivatedRoute) { }
  

    private itemsArray=[];
    clientsArray :any[];
    originalArray:any[];
    eoClient:number;
    url: string = 'rest/medi'+this.router.url;
    isClientItem:boolean=this.router.url == '/allClientItems'?true:false;
    //////pagination
   private dummyArray=this.restSrvc.dummyArray;
    page = 1;
    pageSize = 10;
    recordFrom=1;
    recordTo=this.pageSize;
    noOfItems = this.itemsArray.length;
    get arrayOfData(): any[] {
        console.log(this.itemsArray);
        if(this.page ==1){
            this.recordFrom =  this.page ;
            this.recordTo = this.pageSize;
        }else{
            this.recordFrom = this.pageSize * ( this.page-1) + 1;
            this.recordTo = this.pageSize * this.page > this.noOfItems ? this.noOfItems :  this.pageSize * this.page;

        }
        return this.itemsArray
          .map((obj, i) => ({id: i + 1, ...obj}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }
    
    fetchData(){
        console.log(this.dummyArray);
        
        console.log(this.router.url);
        // console.log(this.router.onSameUrlNavigation);
        // this.restSrvc.getClientDetails().subscribe((res: any[]) => {
        //     this.clientsArray = res;
           
        //     console.log(this.clientsArray)
        // });
        
        this.restSrvc.reqRespAjax(this.url,'').subscribe((resp:any[])=>{
            this.itemsArray = resp;
           this. noOfItems = this.itemsArray.length;
            this.originalArray = resp;
        console.log(this.itemsArray);
        })
    }
    ngOnInit() {
     //   this.fetchData();
    //    this.itemsArray = new DisplayItemsArray();
    }
    ngAfterViewInit(){
       this.fetchData();
    }

  actions(pk: any,actionType:string) {
      if(actionType == 'edit'){
        this.router.navigate(['/medi/editMedi/'+pk]);
      }else if(actionType == 'delete'){
        this.restSrvc.reqRespAjax("rest/medi/delete", this.restSrvc.getDeleteJson('EOMedicine', pk)).subscribe((res: any[]) => {
            this.fetchData();
      
          });
      }
 
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

