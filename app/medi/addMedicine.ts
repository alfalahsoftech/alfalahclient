import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'addMedicine',
    templateUrl: 'addMedicine.html',
    styleUrls: ['addMedicine.css'],
    providers: [DecimalPipe,DatePipe,]
})
export class AddMedicine implements OnInit {
    @Output() messageEvent = new EventEmitter();
    constructor(private modalService: NgbModal, private restSrvc: RestSrvc, private dateObj: DatePipe,  private decimalPipe: DecimalPipe) { }
    closeResult: string;

    open(content: any) {
        this.ngOnInit();
        console.log(content)
        const modalRef = this.modalService.open(content, { size: 'lg',windowClass:'my-class', backdrop: 'static' }).result.then((result) => {
            this.sendData();
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    sendData() {
        console.log("Sending customer info request  to server");
        this.dummyItem.isActive=true;
        // if(this.dummyItem.isActive){
        //     this.dummyItem.isActive='1';
        // }
        if(this.dummyItem.expDate == undefined || this.dummyItem.expDate.length==0){
            this.dummyItem.expDate = this.dateObj.transform(new Date(), 'dd-MM-yyyy');
        }
        console.log(this.dummyItem)
        this.restSrvc.reqRespAjax("rest/medi/addMedi", JSON.stringify(this.dummyItem)).subscribe(responseData => {
            console.log(responseData)
            this.messageEvent.emit(responseData);
        }, error => {
            console.error("Error saving medicine!" );
            console.log(error);
            return Observable.throw(error);
        }

        );
        
    }

    dummyItem: DummyItem
    ngOnInit() {
        this.dummyItem = new DummyItem();
        console.log("Addmedicine.ngOnInit()")
       // $('input[type=checkbox]').removeAttr('checked');
    }
    dropdownOptions =['Dabba','Pc',"gm","Litter","Strip","Bottle","Kartoon"];
    selectionChanged(ev){
        console.log(ev.value);
        this.dummyItem.UOM = ev.value;
        console.log(this.dummyItem.UOM);
    }
    
    calcDueOnKeyUp(){
           
           var val =this.dummyItem.mrp - (this.dummyItem.mrp * this.dummyItem.netRatePerc)/100
           var formatedVal = +this.decimalPipe.transform(val, '.2-2');
           console.log(formatedVal);
           
           this.dummyItem.netRate = formatedVal;
           

     }
     removeZero(id: any) {
        console.log('removed zero called' + id);

        console.log('removed zero called 222' + $("#" + id).val());

        if ($("#" + id).val() == 0 || $("#" + id).val() == 0.0) {
            $("#" + id).val('');
        }
    }
}


export class DummyItem {
    itemID: string='';
    discount: number=0.0;
    mediName : string='';
    UOM: string='';
    mrp: number=0.0;
    scheme: string='';
    netRate: number=0.0;
    batchNo: string='';
    expDate:string='';
    onHand:number;
    mfgBy:string=''
    purchPerc:string;
    notes:string='';
    isActive:boolean;
    netRatePerc:number;
}
