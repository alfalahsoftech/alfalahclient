import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'addStoreMdl',
  templateUrl: './addStoreMdl.html',
  styleUrls: ['./addStoreMdl.css']
})
export class AddStoreMdl implements OnInit {

  constructor(private modalService: NgbModal, private restSrvc: RestSrvc) { }
  @Output() messageEvent = new EventEmitter();
  @Input() obj: any;
  isEdit = false;

  sendData() {

    if (this.isEdit) {
      this.restSrvc.reqRespAjax('rest/settings/addStore', this.obj).subscribe(data => {
        console.log(data);
      });
    } else {
      console.log("Sending Staff info request  to server");
      console.log(this.obj);
      console.log(this.store)
      this.restSrvc.reqRespAjax("rest/settings/addStore", JSON.stringify(this.store)).subscribe(dat => {
        console.log(dat)
      }, error => {
        console.error("Error saving customerInfo!");
        return Observable.throw(error);
      }
      );
    }


    this.messageEvent.emit(this.store);
  }

  closeResult: string;
  modalHeader = "Add  Staff";




  public callByOtherComp() {
    console.log("callByOtherComp")
  }
  public closeMdl() {

  }
  open(content: any) {
    this.ngOnInit();
    const modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static', windowClass: 'my-class' }).result.then((result) => {
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
  ngOnInit() {
    // this.custInfo = this.custObj;
    if (this.obj != undefined) {
      this.isEdit = true;
      this.store = this.obj;
    } else {
      this.store = new StoreInfo();
    }

    console.log(this.store);

  }
  store: StoreInfo;


}

export class StoreInfo {
  storeNo: string;
  storeName: string;
  storeLocation: string;
  isActive: boolean;

}
