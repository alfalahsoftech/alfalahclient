import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'
import { Location, DecimalPipe, DatePipe } from '@angular/common';

@Component(
    {
        selector: 'editMedicine',
        templateUrl: 'editMedicine.html',
        styleUrls: ['editMedicine.css'],
        providers: [DecimalPipe,DatePipe]
    }
)
export class EditMedicine implements OnInit {

    @Output() messageEvent = new EventEmitter();
    constructor( private dateObj: DatePipe,private decimalPipe: DecimalPipe, private route: ActivatedRoute, private router: Router, private modalService: NgbModal, private restSrvc: RestSrvc, private location: Location) { }
    closeResult: string;


alrt:string='';
messageSuccess=false;
    saveChanges() {
        console.log("Sending updateMedi info request  to server");
        // if(this.dummyItem.isActive){
        //     this.dummyItem.isActive='1';
        // }
        // if(this.dummyItem.expDate == undefined || this.dummyItem.expDate.length==0){
        //     this.dummyItem.expDate = this.dateObj.transform(new Date(), 'dd-MM-yyyy');
        // }
        console.log(this.dummyItem)
        delete this.dummyItem['addedOn'];
        this.restSrvc.reqRespAjax("rest/medi/updateMedi", JSON.stringify(this.dummyItem)).subscribe((responseData:string) => {
            console.log(responseData)
            this.alrt="Successfully updated";
            // this.messageSuccess = true;

            setTimeout(()=>{                           //<<<---using ()=> syntax
                //   this.messageSuccess = false;
                this.alrt='';
             }, 3000);
        }, error => {
            console.error("Error updateMedi!");
            this.alrt="Error in updating medicine!";
            // $('#alrt').css('color','red');
            console.log( document.getElementById("alrtMsg"));
          //  document.getElementById("alrtMsg").style.color = "blue";
            $("#alrtMsg").css("color", "red");
            // this.messageSuccess = true;

            setTimeout(()=>{                           //<<<---using ()=> syntax
                //   this.messageSuccess = false;
                this.alrt='';
             }, 5000);
            return Observable.throw(error);
        }

        );

    }

    dummyItem: any;
    pk: string;
    ngOnInit() {
        console.log( document.getElementById("alrtMsg"));//btn1
        // console.log( document.getElementById("alrtMsg"));//btn1
        this.route.paramMap.subscribe(params => {
            this.pk = params.get("pk");
            console.log(params);
            this.fetchData(this.pk);
        });
        this.dummyItem = new DummyItem();
    }

    fetchData(pk: string) {
        this.restSrvc.reqRespAjax('rest/medi/editMedi/' + this.pk, '').subscribe(data => {
            this.dummyItem = data;
            console.log(this.dummyItem);
        });
    }
    dropdownOptions =['Dabba','Pc',"gm","Litter","Strip","Bottle","Kartoon"];
    selectionChanged(ev) {
        console.log(ev.value);
        this.dummyItem.baseUnit = ev.value;
        console.log(this.dummyItem.baseUnit);
    }
    //Actions
    back() {

        this.location.back();
    }

    calcDueOnKeyUp() {
        var val = this.dummyItem.mrp - (this.dummyItem.mrp * this.dummyItem.netRatePerc) / 100
        var formatedVal = +this.decimalPipe.transform(val, '.2-2');
        console.log(formatedVal);
        this.dummyItem.netRate = formatedVal;
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
    notes: string;
    isActive: string;
    netRatePerc: number;
}