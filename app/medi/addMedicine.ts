import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'addMedicine',
    templateUrl: 'addMedicine.html',
    styleUrls: ['addMedicine.css']
})
export class AddMedicine implements OnInit {
    @Output() messageEvent = new EventEmitter();
    constructor(private modalService: NgbModal, private restSrvc: RestSrvc) { }
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
        if(this.dummyItem.isActive){
            this.dummyItem.isActive='1';
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
    }
    dropdownOptions =['Kg','Pc',"gm","Litter","TAB","Syrup",,"Kartoon"];
    selectionChanged(ev){
        console.log(ev.value);
        this.dummyItem.UOM = ev.value;
        console.log(this.dummyItem.UOM);
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
    purchasePrice:string;
    notes:string='';
    isActive:string='0';
}