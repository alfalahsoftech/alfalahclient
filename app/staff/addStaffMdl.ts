import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'addStaffMdl',
  templateUrl: './addStaffMdl.html',
  styleUrls: ['./addStaffMdl.css']
})
export class AddStaffMdl implements OnInit {
  storeArray: any[];
  @Output() messageEvent = new EventEmitter();
  @Input() obj: any;
  isEdit = false;


  constructor(private modalService: NgbModal, private restSrvc: RestSrvc) { }


  sendData() {

    if (this.isEdit) {
      this.restSrvc.reqRespAjax('rest/UserService/editStaff/', this.obj).subscribe(data => {
        console.log(data);
      });
    } else {
      console.log("Sending Staff info request  to server");
      console.log(this.obj);
      console.log(this.userInfo)
      this.restSrvc.reqRespAjax("rest/UserService/addStaff", JSON.stringify(this.userInfo)).subscribe(dat => {
        console.log(dat)
      }, error => {
        console.error("Error saving customerInfo!");
        return Observable.throw(error);
      }
      );
    }


    this.messageEvent.emit(this.userInfo);
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


  getStoreDetails() {
    this.restSrvc.reqRespAjax("rest/settings/dispStore", null).subscribe((res: any[]) => {
      this.storeArray = res;
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
    this.getStoreDetails();
    // this.custInfo = this.custObj;
    if (this.obj != undefined) {
      this.isEdit = true;
      this.userInfo = this.obj;
    } else {
      this.userInfo = new StaffInfo();
    }

    console.log(this.userInfo);

  }
  selectionChanged(ev) {
    console.log(ev.value);
    this.userInfo.eoStore = ev.value.primaryKey;
  }
  userInfo: StaffInfo;


}

export class StaffInfo {
  userName: string;
  // userPassword:string;
  firstName: string;
  lastName: string;
  address: string;
  isActive: boolean;
  contactNo: number;
  eoStore: number;

}
