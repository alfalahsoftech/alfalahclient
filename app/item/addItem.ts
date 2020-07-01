import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'addItem',
    templateUrl: 'addItem.html',
    styleUrls: ['addItem.css']
})
export class AddItem implements OnInit {
    @Output() messageEvent = new EventEmitter();
    constructor(private modalService: NgbModal, private restSrvc: RestSrvc) { }
    closeResult: string;

    open(content: any) {
        this.ngOnInit();
        console.log(content)
        const modalRef = this.modalService.open(content, { size:'lg', backdrop: 'static' ,windowClass:'my-class'}).result.then((result) => {
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
        this.restSrvc.reqRespAjax("rest/food/addItem", JSON.stringify(this.dummyItem)).subscribe(responseData => {
            console.log(responseData)
            this.messageEvent.emit(responseData);
        }, error => {
            console.error("Error saving food!");
            return Observable.throw(error);
        }

        );
        
    }

    dummyItem: DummyItem
    ngOnInit() {
        this.dummyItem = new DummyItem();
    }
    dropdownOptions =['Kg','Pc',"gm","Litter","Bora","Ton","Kartoon"];
    selectionChanged(ev){
        console.log(ev.value);
        this.dummyItem.baseUnit = ev.value;
        console.log(this.dummyItem.baseUnit);
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
}