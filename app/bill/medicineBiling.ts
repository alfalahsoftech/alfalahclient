import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { RestSrvc } from '../srvc/srvc.service';
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
declare const printPDF: any;
declare const onPrintRequest: any;
// the second parameter 'fr' is optional
registerLocaleData(localeIN, 'en-IN');
@Component(
    {
        selector: 'medicineBiling',
        templateUrl: 'medicineBiling.html',
        styleUrls: ['medicineBiling.css'],
        providers: [DecimalPipe, DatePipe]
    }
)
export class MedicineBiling implements OnInit {

    extraParam: string = '';
    isOrderBilling: boolean = false;
    isWithoutOrderBilling: boolean = true;
    dueDate: string = '';
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
    paidAmount: number;
    custInfo: CustDetails = new CustDetails();
    oderedItemsArray: any[];
    query: string = '';
    returnAmt:number;

    constructor(
        private restSrvc: RestSrvc,
        private router: Router,
        private http: HttpClient,
        private decimalPipe: DecimalPipe,
        private dateObj: DatePipe,
        private activatedtRoute: ActivatedRoute
    ) {
        // wind.print();
    }


    inputVal: string = ''; //45-12%
    showDataum: number;
    calculate() {
        console.log(this.inputVal);
        var inArr =[];
        var isMultiply=false;
        var isDivide=false;
        if (this.inputVal != undefined && this.inputVal.length > 0) {
            console.log('this.inputVal.indexOf("/")=== >'+this.inputVal.includes("/"));
            
            if(this.inputVal.includes("*")){
                console.log("Multiply");
                
                inArr = this.inputVal.split("*");
                isMultiply = true;
            }else if(this.inputVal.includes("-")){
                console.log("Minus or %");
                inArr = this.inputVal.split("-");
            }else if(this.inputVal.includes("/")){
                console.log("Devide----");
                inArr = this.inputVal.split("/");
                isDivide=true;
            }
            var in1 = inArr[0];
            var in2 = inArr[1];
   
            console.log('in1 = ' + in1);
            console.log('in2=' + in2);

            if (in1 != undefined && in1.length > 0) {
                this.showDataum = this.getNum(in1);
                if (in2 != undefined && in2.length > 0) {
                    if(isMultiply){
                        this.showDataum = this.getNum(in1) * this.getNum(in2);
                       // console.log('muliddddddddd '+this.showDataum);
                       // this.showDataum =  this.getNum(this.decimalPipe.transform( this.showDataum, '.2-2'));
                       // console.log('222222 '+this.showDataum);
                        return ;
                    }else if(isDivide){
                        console.log('sssssssssddddddd'); 
                        this.showDataum = this.getNum(in1) / this.getNum(in2);
                       // console.log('111111111'+ this.showDataum);
                       // this.showDataum =  this.getNum(this.decimalPipe.transform( this.showDataum, '.2-2'));
                        //console.log('3333333333333'+ this.showDataum);
                        return ;
                    }

                    if (in2.endsWith("%")) {
                        var i = in2.indexOf("%");
                        var num = in2.substring(0, i);
                        console.log('iiii = ' + i);
    
                        console.log('nummm=' + num);
                        var ttPerc = ( this.getNum(in1) * this.getNum(num))/100
                        console.log(ttPerc);
                        
                        this.showDataum =  this.getNum(in1)-ttPerc;
                        console.log(this.showDataum);
                        this.showDataum =  this.getNum(this.decimalPipe.transform( this.showDataum, '.2-2'));

    
                    }else{
                        var mins = this.getNum(in1) - this.getNum(in2);
                        this.showDataum = mins;
                        this.showDataum =  this.getNum(this.decimalPipe.transform( this.showDataum, '.2-2'));
                    }
                   
                }
               

            }
        }else{
            this.showDataum=null;
        }
    }
    numb: number = 0;
    repComma(str: string) {
        return str.replace(',', '');
    }

    strToNum(strVal: string) {
        return Number(this.repComma(strVal));
    }
    getNum(strVal: string) {
        return Number(strVal);
    }
    getFormattedNumber(num: number) {
        const tempVal = this.decimalPipe.transform(num);
        return this.strToNum(tempVal);
    }
    calcDueOnKeyUp() {

        console.log('this.ttPrice ' + this.ttPrice);
        console.log('this.paidAmount= ' + this.paidAmount)
        this.balance ='';
        this.returnAmt = null;
        if(this.paidAmount > this.ttPrice){
             this.returnAmt =  (this.paidAmount == null ? 0 : this.paidAmount)-this.ttPrice;
        }else{
            var due = this.ttPrice - (this.paidAmount == null ? 0 : this.paidAmount);
            console.log(due);
            this.balance = this.decimalPipe.transform(due);
            this.numb = +this.balance;
          
            console.log(this.balance);
        }
       
    }

    results: any[] = [];
    queryField: FormControl = new FormControl();
    ngOnInit() {
        this.queryField.valueChanges
 .subscribe( result => console.log(result));
        this.getAllMedicine();
        const extraparam = this.restSrvc.getExtraParam();
        console.log('extraparam==================' + extraparam);
        this.extraParam = extraparam;
        if (extraparam['isOrderBilling'] == true) {
            console.log('isOrderBilling');
            this.isOrderBilling = true;
            this.isWithoutOrderBilling = false;
        }
        console.log('routePK==>' + this.isOrderBilling)

        //    this.fetchData();
        this.custInfo = new CustDetails();
        this.itemToBeSoldArray = [];
        this.ttNoOfItems = 0;
        this.ttPrice = 0;
        this.ttQnt = 0;
        this.dueDate = '';
        this.balance = '';
        this.paidAmount = 0;
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
        console.log('unitCost=' + item.unitCost)
        this.it = new ItemsSold();
        this.it.name = item.name;
        this.it.quantity = item.quantity;
        this.it.unitCost = item.unitCost;
        this.it.gstPerc = item.gstPerc;

        if (item.quantity != undefined && item.unitCost != undefined) {
            this.it.subTotal = item.quantity * item.unitCost
            console.log(item.quantity)
            console.log(this.it.subTotal);
            if (item.gstPerc != undefined) {
                const gstAmount = (this.it.subTotal * item.gstPerc) / 100;
                console.log(gstAmount);
                const formatedGstAmt = this.decimalPipe.transform(gstAmount, '.2-2');
                console.log(formatedGstAmt)

                this.it.gstAmount = Number.parseFloat(formatedGstAmt);
            }
            console.log('gstAmount=' + this.it.gstAmount)
            this.it.subTotal += this.it.gstAmount;
            this.it.subTotal = this.getFormattedNumber(this.it.subTotal);
            console.log(' this.it.subTotal==' + this.it.subTotal + ' item' + this.it.name);

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

        const v = printPage(this.itemToBeSoldArray, this.custInfo, this.decimalPipe.transform(this.ttPrice));
        var pk = this.extraParam['clientPK'] == undefined ? 0 : this.extraParam['clientPK'];
        const data = { 'pdfDetails': v, 'clientPK': pk };
        return this.http.post(this.restSrvc.appBaseUrl + 'rest/pdf/genPDF', data, { responseType: 'blob' })
            .map(res => {
                console.log(res)
                return new Blob([res], { type: 'application/pdf', });
            });
    }

    generateBill() {

        this.custInfo.billingDate = this.dateObj.transform(new Date(), 'dd-MM-yyyy');
        this.custInfo.dueAmt = this.balance;
        this.custInfo.dueDate = this.dateObj.transform(this.dueDate, 'dd-MM-yyyy');
        this.custInfo.dueDate = this.custInfo.dueDate == null ? '' : this.custInfo.dueDate;
        if (Object.keys(this.itemToBeSoldArray).length == 0) {
            alert("No Items to generate bill!!")
            return;
        }
        console.log('Generating Bill for customer....')
        //  this.addCustInfo();
        if (confirm('Are you sure you want to generate bill?')) {
            let tab = window.open();
            this.downloadPDF().subscribe(data => {
                console.log(data)

                const fileUrl = URL.createObjectURL(data);
                console.log("fileUrl=====>" + fileUrl)
                // onPrintRequest(data);
                tab.location.href = fileUrl;
                printPDF(tab);
            });
            //this.saveData();
        }

    }

    saveData() {
        // this.restSrvc.reqRespAjax('rest/food/soldItems', this.itemToBeSoldArray).subscribe((resp: any[]) => {
        //    var msg = resp;
        //   // alert(msg);
        //   this.ngOnInit(); 
        // })
        this.ngOnInit(); //Comment when u uncomment above
    }
    ///////////////////////////////////////////////Biling of Medicine /////////////////////////////////////
    selectedMediList: MediSold[] = [];

    listOfMedicines = [];
    medicinesArray2 = [{ 'id': 123 }, { 'id': 123 }];
    medicinesArray = [];
    selectedMedi: any;
    selectedMediName: string;

    medi: MediSold;
    // subTotal:number=0.0;
    alrt: string;

    getAllMedicine() {
        this.restSrvc.reqRespAjax('rest/medi/dispMedi', '').subscribe((resp: any[]) => {
            this.medicinesArray = resp;
            console.log(this.medicinesArray)
            //this.pushData();
        });
    }

    pushData() {
        for (let index = 0; index < 10; index++) {
            let obj = this.listOfMedicines[index];
            if (obj != undefined) {
                this.medicinesArray.push(obj);
            }

        }

        console.log(this.medicinesArray);
    }

    selectionChanged(ev) {
        console.log(ev.value);
        this.selectedMediName = ev.value != undefined ? ev.value.mediName : '';
    }
    addMedi(selectedMedi) {

        this.alrt = '';
        console.log("window.location.host-->>> " + window.location.host);

        if (selectedMedi.mrp == 0) {
            this.alrt = "Please add M.R.P for medicine =>: ";
            return;
        }
        if (selectedMedi.qnt == 0 || selectedMedi.qnt == undefined) {
            this.alrt = "Please enter quantity!";

            return;
        }

        var isNew = true;
        var objIndex;
        for (let i = 0; i < this.selectedMediList.length; i++) {
            var medi = this.selectedMediList[i];
            console.log(selectedMedi.itemID + '     ' + medi.itemID);

            if (selectedMedi.itemID == medi.itemID) {
                this.medi = medi;
                objIndex = i;
                console.log("Medicine Matched=>");
                isNew = false;
                break;

            }
        }
        console.log("selectedMedi--->> ");
        console.log(selectedMedi);

        this.selectedMediName = selectedMedi.mediName;

        if (isNew) {
            //    this.medi=selectedMedi;
            this.medi = new MediSold();
            this.medi.primaryKey = selectedMedi.primaryKey;
            this.medi.itemID = selectedMedi.itemID;
            this.medi.scheme = selectedMedi.scheme;
            this.medi.name = selectedMedi.mediName;
            this.medi.quantity = selectedMedi.qnt;
            this.medi.discount = selectedMedi.discount;
            this.medi.expDate = selectedMedi.expDate;
            this.medi.mfgBy = selectedMedi.mfgBy;
            this.medi.unitCost = selectedMedi.mrp
        } else {
            this.medi.quantity += selectedMedi.qnt;
        }



        var radioValue = $("input[name='calOn']:checked").val();
        var localSubTotal = 0;

        if (selectedMedi.discount != 0) {

            if (radioValue == '1') {
                var discAmt = (selectedMedi.mrp * selectedMedi.discount) / 100
                console.log('discAmt=> ' + discAmt);
                var actAmt = selectedMedi.mrp - discAmt;
                console.log('actual price==> ' + actAmt);

                localSubTotal = selectedMedi.qnt * actAmt;
            } else {
                var discAmt = (selectedMedi.netRate * selectedMedi.discount) / 100
                console.log('discAmt=> ' + discAmt);

                var actAmt = selectedMedi.netRate - discAmt;

                if (selectedMedi.scheme != undefined && selectedMedi.scheme.length != 0) {
                    console.log(selectedMedi.scheme.split("+"));

                    var first = selectedMedi.scheme.split("+")[0]
                    console.log('first=>' + first);
                    var i1 = parseInt(first, 10);
                    var secnd = selectedMedi.scheme.split("+")[1]
                    var i2 = parseInt(secnd, 10);

                    var total = (actAmt * i1)
                    console.log('totoal= ' + total);
                    var noOfItem = (i1 + i2);
                    console.log('noOfItem== ' + noOfItem);

                    var perItem = total / noOfItem;
                    console.log('perItem-- ' + perItem);


                    console.log('secnd==>' + secnd);
                    localSubTotal = selectedMedi.qnt * perItem;

                } else {
                    localSubTotal = selectedMedi.qnt * actAmt;
                }
            }

        } else {
            if (radioValue == '1') {
                localSubTotal = selectedMedi.qnt * (selectedMedi.mrp == 0 ? 1 : selectedMedi.mrp);
            } else {
                localSubTotal = selectedMedi.qnt * (selectedMedi.netRate == 0 ? 1 : selectedMedi.netRate);
            }
        }

        if (isNew) {
            this.medi.subTotal = localSubTotal;
            this.ttNoOfItems++;
            this.selectedMediList.push(this.medi);
            this.itemToBeSoldArray.push(this.medi)

        } else {
            this.medi.subTotal += localSubTotal;
            this.selectedMediList[objIndex] = (this.medi);
            this.itemToBeSoldArray[objIndex] = (this.medi)
        }

        this.ttPrice += localSubTotal;
        this.ttQnt += selectedMedi.qnt;


        // this.calculateTotal(this.medi, false);

    }

    doNullAfterAdd(selectedMedi) {
        this.selectedMedi.qnt = 0;
        this.selectedMedi.discount = 0;
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
    gstPerc: string;
    unitCost: string;
    gstAmount: number;
}

export class CustDetails {
    contactNo: number;
    clientName: string = '';
    address: string = '';
    stateCode: number = 10;
    gstNo: string = '';
    billingDate: string = '';
    dueDate: string = '';
    dueAmt: string;
}

export class MediSold {
    itemID: string;
    primaryKey: number;
    name: string;
    quantity: number;
    subTotal: number;
    pack: string = '1X15';
    unitCost: number;
    expDate: string;
    mfgBy: string;
    discount: number;
    scheme: string

}
