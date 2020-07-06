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
declare const printPage: any;
declare const printPDF:any;
declare const onPrintRequest:any;
// the second parameter 'fr' is optional
registerLocaleData(localeIN, 'en-IN');
@Component(
    {
        selector: 'medicineBiling',
        templateUrl: 'medicineBiling.html',
        styleUrls: ['medicineBiling.css'],
        providers: [DecimalPipe,DatePipe]
    }
)
export class MedicineBiling implements OnInit {

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
        this.getAllMedicine();
        const extraparam =this.restSrvc.getExtraParam();
        console.log('extraparam=================='+extraparam);
       this.extraParam=extraparam;
            if(extraparam['isOrderBilling']==true){
                console.log('isOrderBilling');
                this.isOrderBilling=true;
                this.isWithoutOrderBilling=false;
            }
            console.log('routePK==>' + this.isOrderBilling)
        
    //    this.fetchData();
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
        // this.itemToBeSoldArray.splice(this.itemToBeSoldArray.indexOf(itemSold), 1);
        this.selectedMediList.splice(this.selectedMediList.indexOf(itemSold), 1);
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
        this.ttNoOfItems = Object.keys(this.selectedMediList).length;
    }
    downloadPDF(): any {
       
        const v=  printPage(this.itemToBeSoldArray, this.custInfo,this.decimalPipe.transform(this.ttPrice));
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
            printPDF(tab);
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
    ///////////////////////////////////////////////Biling of Medicine /////////////////////////////////////
    selectedMediList:MediSold[] = [];
    
    listOfMedicines = [];
    medicinesArray2 = [{'id':123},{'id':123}];
    medicinesArray = [];
    selectedMedi:any;
    selectedMediName:string;
    
    medi:MediSold;
    // subTotal:number=0.0;
    alrt:string;

    getAllMedicine(){
    this.restSrvc.reqRespAjax('rest/medi/dispMedi','').subscribe((resp:any[])=>{
       this.medicinesArray = resp;
        console.log(this.medicinesArray)
        //this.pushData();
        });
    }

    pushData(){
        for (let index = 0; index <10; index++) {
            let obj = this.listOfMedicines[index];
            if(obj!=undefined){
                this.medicinesArray.push(  obj);
            }
              
          }
        
        console.log( this.medicinesArray);
    }
    
    selectionChanged(ev){
        console.log(ev.value);
        this.selectedMediName =ev.value != undefined?ev.value.mediName:'';
    }
    addMedi(selectedMedi){
       
       
      if(selectedMedi.mrp==0){
         this.alrt="Please add M.R.P for medicine =>: ";
          return;
      }
      if(selectedMedi.qnt == 0 || selectedMedi.qnt == undefined){
        this.alrt = "Please enter quantity!";
        return;
      }
      this.selectedMediName = selectedMedi.mediName ;
    
       
        this.medi = new MediSold();
        this.medi.scheme = selectedMedi.scheme;
        this.medi.name = selectedMedi.mediName;
        this.medi.quantity =     selectedMedi.qnt;
        this.medi.discount = selectedMedi.discount;
        this.medi.expDate = selectedMedi.expDate;
        this.medi.mfgBy = selectedMedi.mfgBy;
        this.medi.unitCost = selectedMedi.mrp
    
    
    var radioValue = $("input[name='calOn']:checked").val();
    
            console.log('radioValue==== '+radioValue);
            
    if(selectedMedi.discount != 0 ){

        if(radioValue=='1'){
            var discAmt = (selectedMedi.mrp * selectedMedi.discount)/100
            console.log('discAmt=> '+discAmt);
                var actAmt = selectedMedi.mrp-discAmt;
                console.log('actual price==> '+actAmt);
                
            this.medi.subTotal = selectedMedi.qnt *actAmt;
        }else{
            var discAmt = (selectedMedi.netRate * selectedMedi.discount)/100
            console.log('discAmt=> '+discAmt);

                var actAmt = selectedMedi.netRate-discAmt;
                
                if(selectedMedi.scheme != undefined && selectedMedi.scheme.length !=0){
                    console.log(selectedMedi.scheme.split("+"));
                    
                    var first = selectedMedi.scheme.split("+")[0]
                    console.log('first=>' +first);
                    var i1 = parseInt(first, 10);
                    var secnd = selectedMedi.scheme.split("+")[1]
                    var i2 = parseInt(secnd, 10);

                    var total = (actAmt * i1)
                    console.log('totoal= '+ total);
                    var noOfItem =(i1+i2);
                    console.log('noOfItem== '+noOfItem);
                    
                   var  perItem = total/noOfItem;
                    console.log('perItem-- '+perItem);
                    

                    console.log('secnd==>'+secnd);
                    this.medi.subTotal = selectedMedi.qnt * perItem;
                    
                }else{
                    this.medi.subTotal = selectedMedi.qnt *actAmt;
                }            
        }
        
      }else{
        if(radioValue=='1'){
             this.medi.subTotal = selectedMedi.qnt * (selectedMedi.mrp==0?1:selectedMedi.mrp);
        }else{
            this.medi.subTotal = selectedMedi.qnt * (selectedMedi.netRate==0?1:selectedMedi.netRate);
        }
      }

        
        this.ttPrice += this.medi.subTotal;
        this.ttQnt +=selectedMedi.qnt;
        this.ttNoOfItems++;
        
        this.selectedMediList.push(this.medi);

        this.itemToBeSoldArray.push(this.medi)
       // this.calculateTotal(this.medi, false);

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

export class MediSold {
    name: string;
    quantity: number;
    subTotal: number;
    pack:string='1X15';
    unitCost:number;
    expDate:string;
    mfgBy:string;
    discount:number;
    scheme:string
}
