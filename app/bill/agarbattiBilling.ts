import { Component, OnInit, Inject, AfterViewInit } from '@angular/core'
import { RestSrvc } from '../srvc/srvc.service'
import { log } from 'util';
// import { WindowRefService } from '../service/WindowRefService';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { of } from 'rxjs/observable/of';
import { DecimalPipe, DatePipe, registerLocaleData } from '@angular/common';
import localeIN from '@angular/common/locales/en-IN';
import { stringify } from 'querystring';
declare const myTest: any; //Solved by https://www.truecodex.com/course/angular-6/how-to-use-external-js-files-and-javascript-code-in-angular
declare const printPageAgbt: any;
declare const printPDFAgbt:any;
declare const onPrintRequestAgbt:any;
// the second parameter 'fr' is optional
registerLocaleData(localeIN, 'en-IN');
@Component(
    {
        selector: 'agarbattiBilling',
        templateUrl: 'agarbattiBilling.html',
        styleUrls: ['agarbattiBilling.css'],
        providers: [DecimalPipe,DatePipe]
    }
)
export class AgarbattiBilling implements OnInit {

    extraParam:string='';
    isOrderBilling:boolean=false;
    isWithoutOrderBilling:boolean=true;
    dueDate:string='';
    itemsArray: any[];
    itemShow: DisplayItemsArray;
    itemToBeSoldArray: any[] = [];
    it: ItemsSold;
    isPrinting: boolean;

    localArray: DisplayItemsArray[];
    ttNoOfItems: number = 0;
    ttQnt: number = 0;
    ttPrice: number = 0.0;
    balance: string;
    paidAmount:number;
    custInfo: CustDetails = new CustDetails();
    oderedItemsArray: any[];
    query:string = '';
    
    constructor(
        private restSrvc: RestSrvc,
        private router: Router,
        private http:HttpClient,
        private decimalPipe:DecimalPipe,
        private dateObj:DatePipe,
        private activatedtRoute:ActivatedRoute
    ) {
        // wind.print();
    }


    numb:number=0;
    repComma(str:string){
      return str.replace(',','');
    }

    strToNum(strVal:string){
        return Number(this.repComma(strVal));
    }
    getFormattedNumber(num:number){
        const tempVal = this.decimalPipe.transform(num);
        return this.strToNum(tempVal);
    }
    calcDueOnKeyUp(){
        
        console.log('this.ttPrice '+this.ttPrice);
        console.log('this.paidAmount= '+this.paidAmount)
         var due=this.ttPrice- (this.paidAmount==null?0:this.paidAmount);
        console.log(due);
        this.balance = this.decimalPipe.transform(due);
        this.numb= +this.balance;
        console.log(this.balance);
    }
    fetchData() {
        if(this.isOrderBilling){
            this.restSrvc.reqRespAjax('rest/food/orderedItems', this.extraParam).subscribe((resp: any[]) => {
                this.oderedItemsArray =  JSON.parse(resp['itemDetails']);
                console.log(  this.oderedItemsArray);
                this.ttPrice = Number(resp['ttlPrice']);
                console.log(resp['clientDetails']);
                this.custInfo  = JSON.parse(resp['clientDetails']);
                console.log(this.custInfo);
                this.oderedItemsArray.forEach(item=>{
                    this.add(item);
                });

               
            })
        }else{
            this.restSrvc.reqRespAjax('rest/food/allItems', '').subscribe((resp: any[]) => {
                this.itemsArray = resp;
            })
        }
      
    }

    ngOnInit() {
        
        const extraparam =this.restSrvc.getExtraParam();
        console.log('extraparam=================='+extraparam);
       this.extraParam=extraparam;
            if(extraparam['isOrderBilling']==true){
                console.log('isOrderBilling');
                this.isOrderBilling=true;
                this.isWithoutOrderBilling=false;
            }
            console.log('routePK==>' + this.isOrderBilling)
        
       this.fetchData();
        this.custInfo = new CustDetails();
        this.itemToBeSoldArray = [];
        this.ttNoOfItems = 0;
        this.ttPrice = 0;
        this.ttQnt = 0;
        this.dueDate='';
        this.balance='';
        this.paidAmount=0;
        // this.itemsArray = new DisplayItemsArray();
    }
    actions(pk: number, type: string) {
        console.log("primaryKey= " + pk + ' type =' + type);
    }
    receiveMessage($event: DisplayItemsArray) {

        console.log($event);
        this.itemsArray.push($event);
        console.log(this.itemsArray);
    }

    add(item: any) {
        console.log('unitCost='+item.unitCost)
        this.it = new ItemsSold();
        this.it.name = item.name;
        this.it.quantity = item.quantity;
        this.it.unitCost = item.unitCost;
        this.it.gstPerc = item.gstPerc;
      
        if (item.quantity != undefined && item.unitCost != undefined) {
            this.it.subTotal = item.quantity * item.unitCost
            console.log(item.quantity)
            console.log(this.it.subTotal);
            if(item.gstPerc!= undefined){
              const gstAmount = (this.it.subTotal*item.gstPerc)/100;
              console.log(gstAmount);
              const formatedGstAmt=  this.decimalPipe.transform(gstAmount,'.2-2');
              console.log(formatedGstAmt)
              
                this.it.gstAmount =Number.parseFloat(formatedGstAmt);
            }
            console.log('gstAmount='+this.it.gstAmount)
            this.it.subTotal +=this.it.gstAmount;
            this.it.subTotal = this.getFormattedNumber(this.it.subTotal);
            console.log(' this.it.subTotal=='+ this.it.subTotal  +' item'+ this.it.name);
            
        } else {
            alert("Unit cost is not defined!")
            return;
        }

        this.itemToBeSoldArray.push(this.it)
        this.calculateTotal(this.it, false);
    }

    delete(itemSold: any) {
        console.log(itemSold);
        this.itemToBeSoldArray.splice(this.itemToBeSoldArray.indexOf(itemSold), 1);
        this.calculateTotal(itemSold, true);
    }

    //customer detail for eache item in SoldItem
    addCustInfo() {
        this.itemToBeSoldArray.forEach(it => {
            it.clientName = this.custInfo.clientName;
            it.address = this.custInfo.address;
            it.gstNo = this.custInfo.gstNo;
            it.contactNo = this.custInfo.contactNo;
            it.stateCode = this.custInfo.stateCode;
        })
    }

    calculateTotal(localItem: any, isDelete: boolean) {
        if (isDelete) {
            this.ttQnt -= localItem.quantity;
            this.ttPrice -= localItem.subTotal;
        } else {
            this.ttQnt += localItem.quantity;
            this.ttPrice += localItem.subTotal;
        }
        this.ttNoOfItems = Object.keys(this.itemToBeSoldArray).length;
    }
    downloadPDF(): any {
       
        const v=  printPageAgbt(this.itemToBeSoldArray, this.custInfo,this.decimalPipe.transform(this.ttPrice));
     var pk =this.extraParam['clientPK']==undefined?0:this.extraParam['clientPK'];
        const data = {'pdfDetails':v,'clientPK':pk};
        return this.http.post(this.restSrvc.appBaseUrl+'rest/pdf/genPDF',data, { responseType: 'blob'})
                .map(res => {
                    console.log(res)
                return new Blob([res], { type: 'application/pdf', });
            });
      }
          
    generateBill() {

        this.custInfo.billingDate=this.dateObj.transform(new Date(),'dd-MM-yyyy');
        this.custInfo.dueAmt=this.balance;
        this.custInfo.dueDate=this.dateObj.transform(this.dueDate,'dd-MM-yyyy');
        this.custInfo.dueDate=this.custInfo.dueDate==null?'':this.custInfo.dueDate;
        if(Object.keys(this.itemToBeSoldArray).length==0){
            alert("No Items to generate bill!!")
            return;
        }
        console.log('Generating Bill for customer....')
      //  this.addCustInfo();
        if (confirm('Are you sure you want to generate bill?')){
            let tab = window.open();
           this .downloadPDF().subscribe(data => {
              console.log(data)
              
            const fileUrl = URL.createObjectURL(data);
            console.log("fileUrl=====>"+fileUrl)
            // onPrintRequest(data);
            tab.location.href = fileUrl;
            printPDFAgbt(tab);
          });
           //this.saveData();
        }
        
    }

    saveData() {
        this.restSrvc.reqRespAjax('rest/food/soldItems', this.itemToBeSoldArray).subscribe((resp: any[]) => {
           var msg = resp;
          // alert(msg);
           this.ngOnInit();
        })
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
    notes: string;
    isActive: string;
    quantity: string;
}
export class ItemsSold {
    name: string;
    quantity: number;
    subTotal: number;
    contactNo: number;
    clientName: string;
    address: string;
    stateCode: number;
    gstNo: string;
    gstPerc:string;
    unitCost: string;
    gstAmount:number;
}

export class CustDetails {
    contactNo: number;
    clientName: string='';
    address: string='';
    stateCode: number=10;
    gstNo: string='';
    billingDate:string='';
    dueDate:string='';
    dueAmt:string;
}

