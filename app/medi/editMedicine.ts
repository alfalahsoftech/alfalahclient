import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router'
import { Location } from '@angular/common';

@Component(
    {
        selector: 'editMedicine',
        templateUrl: 'editMedicine.html',
        styleUrls: ['editMedicine.css']
    }
)
export class EditMedicine implements OnInit {

    @Output() messageEvent = new EventEmitter();
    constructor(private route: ActivatedRoute,private router:Router, private modalService: NgbModal, private restSrvc: RestSrvc,private location:Location) { }
    closeResult: string;

 

   
    saveChanges() {
        console.log("Sending updateMedi info request  to server");
        if(this.dummyItem.isActive){
            this.dummyItem.isActive='1';
        }
        console.log(this.dummyItem)
        delete this.dummyItem['addedOn'];
        this.restSrvc.reqRespAjax("rest/medi/updateMedi", JSON.stringify(this.dummyItem)).subscribe(responseData => {
            console.log(responseData)
            
        }, error => {
            console.error("Error updateMedi!");
            return Observable.throw(error);
        }

        );
        
    }

    dummyItem: any;
    pk:string;
    ngOnInit() {
        
        this.route.paramMap.subscribe(params=>{
            this.pk = params.get("pk");
            console.log(params);
            this.fetchData(this.pk);
        });
        this.dummyItem = new DummyItem();
    }

    fetchData(pk :string){
        this.restSrvc.reqRespAjax('rest/medi/editMedi/'+this.pk ,'').subscribe(data=>{
            this.dummyItem = data;
            console.log(this.dummyItem);
        });
    }
    dropdownOptions =['Kg','Pc',"gm","Litter","Bora","Ton","Kartoon"];
    selectionChanged(ev){
        console.log(ev.value);
        this.dummyItem.baseUnit = ev.value;
        console.log(this.dummyItem.baseUnit);
    }
   //Actions
   back(){
      
   this.location.back();
   }

   calcDueOnKeyUp(){
    this.dummyItem.netRate =this.dummyItem.mrp - (this.dummyItem.mrp * this.dummyItem.netRatePerc)/100
    }
}


export class DummyItem {
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
    netRatePerc:number;
}