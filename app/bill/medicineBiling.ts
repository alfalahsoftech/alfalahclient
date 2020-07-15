import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { AFUtil } from '../helper/util';
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
    returnAmt: number;
    lastSoldMediArray = [];

    constructor(
        private restSrvc: RestSrvc,
        private router: Router,
        private http: HttpClient,
        private decimalPipe: DecimalPipe,
        private dateObj: DatePipe,
        private activatedtRoute: ActivatedRoute,
        private util: AFUtil
    ) {
        // wind.print();
    }


    inputVal: string = ''; //45-12%
    showDataum: number;
    calculate() {
        console.log(this.inputVal);
        var inArr = [];
        var isMultiply = false;
        var isDivide = false;
        if (this.inputVal != undefined && this.inputVal.length > 0) {
            console.log('this.inputVal.indexOf("/")=== >' + this.inputVal.includes("/"));

            if (this.inputVal.includes("*")) {
                console.log("Multiply");

                inArr = this.inputVal.split("*");
                isMultiply = true;
            } else if (this.inputVal.includes("-")) {
                console.log("Minus or %");
                inArr = this.inputVal.split("-");
            } else if (this.inputVal.includes("/")) {
                console.log("Devide----");
                inArr = this.inputVal.split("/");
                isDivide = true;
            }
            var in1 = inArr[0];
            var in2 = inArr[1];

            console.log('in1 = ' + in1);
            console.log('in2=' + in2);

            if (in1 != undefined && in1.length > 0) {
                this.showDataum = this.getNum(in1);
                if (in2 != undefined && in2.length > 0) {
                    if (isMultiply) {
                        this.showDataum = this.getNum(in1) * this.getNum(in2);
                        // console.log('muliddddddddd '+this.showDataum);
                        // this.showDataum =  this.getNum(this.decimalPipe.transform( this.showDataum, '.2-2'));
                        // console.log('222222 '+this.showDataum);
                        return;
                    } else if (isDivide) {
                        console.log('sssssssssddddddd');
                        this.showDataum = this.getNum(in1) / this.getNum(in2);
                        // console.log('111111111'+ this.showDataum);
                        // this.showDataum =  this.getNum(this.decimalPipe.transform( this.showDataum, '.2-2'));
                        //console.log('3333333333333'+ this.showDataum);
                        return;
                    }

                    if (in2.endsWith("%")) {
                        var i = in2.indexOf("%");
                        var num = in2.substring(0, i);
                        console.log('iiii = ' + i);

                        console.log('nummm=' + num);
                        var ttPerc = (this.getNum(in1) * this.getNum(num)) / 100
                        console.log(ttPerc);

                        this.showDataum = this.getNum(in1) - ttPerc;
                        console.log(this.showDataum);
                        this.showDataum = this.getNum(this.decimalPipe.transform(this.showDataum, '.2-2'));


                    } else {
                        var mins = this.getNum(in1) - this.getNum(in2);
                        this.showDataum = mins;
                        this.showDataum = this.getNum(this.decimalPipe.transform(this.showDataum, '.2-2'));
                    }

                }


            }
        } else {
            this.showDataum = null;
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
        this.balance = '';
        this.returnAmt = null;
        if (this.paidAmount > this.ttPrice) {
            this.returnAmt = (this.paidAmount == null ? 0 : this.paidAmount) - this.ttPrice;
        } else {
            var due = this.ttPrice - (this.paidAmount == null ? 0 : this.paidAmount);
            console.log(due);
            this.balance = this.decimalPipe.transform(due);
            this.numb = +this.balance;

            console.log(this.balance);
        }

    }
    private custDetails = [];
    clientDetails() {
        this.restSrvc.getClientDetails().subscribe((res: any[]) => {
            this.custDetails = res;
            // this.custDetails.push()
            console.log(this.custDetails)
        });
    }


    ngOnInit() {

        this.getAllMedicine();
        this.clientDetails();
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

        this.ttNoOfItems = 0;
        this.ttPrice = 0;
        this.ttQnt = 0;
        this.dueDate = '';
        this.balance = '';
        this.paidAmount = 0;
        //Array
        this.showDummyDataArray = [];
        this.selectedMediList = [];
        this.selectedMediName = '';

        // this.itemsArray = new DisplayItemsArray();
    }
    fetchLastSoldMedi(clientID: string) {
        this.http.get(this.restSrvc.appBaseUrl + 'rest/medi/lastSoldMedi/' + clientID).subscribe((resp: any[]) => {
            this.lastSoldMediArray = resp;
            console.log("====lastSoldMediArray======");

            console.log(this.lastSoldMediArray);
        })
        // throw new Error("Method not implemented.");
    }
    actions(pk: number, type: string) {
        console.log("primaryKey= " + pk + ' type =' + type);
    }
    receiveMessage($event: DisplayItemsArray) {

        console.log($event);
        this.itemsArray.push($event);
        console.log(this.itemsArray);
    }

    delete(itemSold: any) {
        console.log(itemSold);
        console.log(this.selectedMediList);

        this.selectedMediList.splice(this.selectedMediList.indexOf(itemSold), 1);
        console.log('After delete');
        console.log(this.selectedMediList);
        
        this.calculateTotal(itemSold, true);
    }

    //customer detail for eache item in SoldItem
    addCustInfo() {
        this.selectedMediList.forEach(it => {
            it.clientName = this.custInfo.clientName;
            it.address = this.custInfo.address;
            it.gstNo = this.custInfo.gstNo;
            it.contactNo = this.custInfo.contactNo;
            it.stateCode = this.custInfo.stateCode;
            it.clientID = this.custInfo.clientID;
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

        const v = printPage(this.selectedMediList, this.custInfo, this.decimalPipe.transform(this.ttPrice));
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
        if (Object.keys(this.selectedMediList).length == 0) {
            alert("No Items to generate bill!!")
            return;
        }
        console.log('Generating Bill for customer....')
        this.addCustInfo();
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
            this.saveData();
        }

    }

    saveData() {
        this.restSrvc.reqRespAjax('rest/medi/soldMedi', this.selectedMediList).subscribe((resp: any[]) => {
            var msg = resp;
            // alert(msg);
            this.ngOnInit();
        })
        //this.ngOnInit(); //Comment when u uncomment above
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

    selectionChanged(ev: any) {
        console.log(ev.value);
        this.selectedMediName = ev.value != undefined ? ev.value.mediName : '';
    }

    lastSoldMediDtls: MediSold = new MediSold();
    showLastSold(selectedMedi: any) {
        
        for (let i = 0; i < this.lastSoldMediArray.length; i++) {
            var medi = this.lastSoldMediArray[i];
            if (selectedMedi.itemID == medi.itemID) {
                this.lastSoldMediDtls = medi;
                console.log("Medicine Matched=>");
                break;
            }
        }
    }

    addMedi(selectedMedi: any) {
        this.alrt = '';

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

        // this.selectedMediName = selectedMedi.mediName;

        if (isNew) {
            //    this.medi=selectedMedi;
            this.medi = new MediSold();
            //this.medi.primaryKey = selectedMedi.primaryKey;
            this.medi.itemID = selectedMedi.itemID;
            this.medi.scheme = selectedMedi.scheme;
            this.medi.mediName = selectedMedi.mediName;
            this.medi.quantity = selectedMedi.qnt;
            this.medi.discount = selectedMedi.discount;
            this.medi.expDate = selectedMedi.expDate;
            this.medi.mfgBy = selectedMedi.mfgBy;
            this.medi.unitCost = selectedMedi.mrp
            //Select itemID,mediName,unitCost,qunatity from EOMedicine where
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


        } else {
            this.medi.subTotal += localSubTotal;
            this.selectedMediList[objIndex] = (this.medi);

        }

        this.ttPrice += localSubTotal;
        this.ttQnt += selectedMedi.qnt;


        // this.calculateTotal(this.medi, false);

    }

    doNullAfterAdd(selectedMedi) {
        this.selectedMedi.qnt = 0;
        this.selectedMedi.discount = 0;
    }
    myInput: string;
    myCustInput: string;
    showMediArray = [];
    showDummyDataArray = [];
    dummyArray = this.restSrvc.dummyArray;

    cust_clickTheSelectedItem(obj) {
        console.log("selected customer name");

        console.log(obj);
        //var selVal = obj.mediName;
        //console.log(selVal);
        this.custInfo = obj;
        //  $("#myInput").val(obj.name);
        $("#myCustDropdown").removeClass("show").addClass("hideItems");
        // document.getElementById("myDropdown").classList.toggle("hideItems");
        this.isCustShowed = true;
        this.fetchLastSoldMedi(this.custInfo.clientID);

    }
    isCustShowed: boolean = true;
    cust_filterFunction(e) {
        console.log("Keyup callled====>this.isShowed=>" + this.isCustShowed);
        console.log(e);

        this.myCustInput = $('#myCustInput').val() + '';
        console.log(this.myCustInput);
        if (this.myCustInput == undefined || (this.myCustInput != undefined && this.myCustInput.length == 0)) {
            $("#myCustDropdown").removeClass("show").addClass("hideItems");
            this.isCustShowed = true; //Jehan remove wahan true kar k rakho so that next time koi key input kre toh data show hojae
            this.custInfo = new CustDetails();
            return;
        }
        if (this.isCustShowed) {
            console.log('111111111');
            $("#myCustDropdown").removeClass("hideItems").addClass("show");
            // document.getElementById("myDropdown").classList.toggle("show");
            if (e.keyCode == 38) {
                console.log('222222');

                this.isCustShowed = true;
            } else {
                console.log('333333333');
                this.isCustShowed = false;
            }

        }
        var input, filter, ul, li, a, i;
        input = document.getElementById("myCustInput");
        filter = input.value.toLowerCase();
        var div = document.getElementById("myCustDropdown");
        a = div.getElementsByTagName("a");
        console.log('anchor myCustDropdown len. ' + a.length);
        for (i = 0; i < a.length; i++) {
            var txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                a[i].style.display = "";
                console.log("index greater===>");

            } else {
                a[i].style.display = "none";
                console.log("No data found!");

                //$('#myCustDropdown').css("height: 0px;");
            }
        }
    }

    clickTheSelectedItem(obj) {
        var selVal = obj.mediName;
        this.lastSoldMediDtls = new MediSold();
        this.showLastSold(obj);
        this.showDummyDataArray.push(obj);
        $("#myInput").val(obj.name);
        $("#myDropdown").removeClass("show").addClass("hideItems");
        // document.getElementById("myDropdown").classList.toggle("hideItems");
        this.isShowed = true;
        console.log(this.showDummyDataArray);

    }

    isShowed: boolean = true;
    filterFunction(e) {
        console.log("Keyup callled====>this.isShowed=>" + this.isShowed);
        console.log(e);
        console.log(this.myInput);

        if (this.myInput == undefined || (this.myInput != undefined && this.myInput.length == 0)) {
            $("#myDropdown").removeClass("show").addClass("hideItems");
            this.isShowed = true; //Jehan remove wahan true kar k rakho so that next time koi key input kre toh data show hojae
            return;
        }
        if (this.isShowed) {
            console.log('111111111');
            $("#myDropdown").removeClass("hideItems").addClass("show");
            // document.getElementById("myDropdown").classList.toggle("show");
            if (e.keyCode == 38) {
                console.log('222222');

                this.isShowed = true;
            } else {
                console.log('333333333');
                this.isShowed = false;
            }
        }
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toLowerCase();
        var div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");
        console.log('anchor len. ' + a.length);
        for (i = 0; i < a.length; i++) {
            var txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }

    removeZero(id: any) {
        if ($("#" + id).val() == 0) {
            $("#" + id).val('');
        }
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

export class CustDetails {
    clientID: string;
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
    //primaryKey: number;
    mediName: string;
    quantity: number;
    subTotal: number;
    pack: string = '1X15';
    unitCost: number;
    expDate: string;
    mfgBy: string;
    discount: number;
    scheme: string
    contactNo: number;
    clientName: string;
    address: string;
    stateCode: number;
    gstNo: string;
    gstPerc: string;
    clientID: string;
    gstAmount: number;

}
