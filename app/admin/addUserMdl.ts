import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'addUserMdl',
  templateUrl: './addUserMdl.html',
  styleUrls: ['./addUserMdl.css']
})
export class  AddUserMdl implements OnInit {

  constructor(private modalService: NgbModal, private restSrvc: RestSrvc) { }
  @Output() messageEvent = new EventEmitter();
  @Input() custObj:any;

  
  sendData() {
    console.log("Sending customer info request  to server");
    console.log(this.custObj);
    console.log(this.userInfo)
    this.restSrvc.reqRespAjax("rest/UserService/addUser", JSON.stringify(this.userInfo)).subscribe(dat => {
      console.log(dat)
    }, error => {
      console.error("Error saving customerInfo!");
      return Observable.throw(error);
    }

    );

    this.messageEvent.emit(this.userInfo);
  }

  closeResult: string;
  modalHeader = "Add  User Details";




  public callByOtherComp() {
    console.log("callByOtherComp")
  }
  public closeMdl() {

  }
  open(content: any) {
    this.ngOnInit();
    const modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static',windowClass: 'my-class' }).result.then((result) => {
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
   this.userInfo=new UserInfo();
    console.log(this.userInfo);

  }
  userInfo: UserInfo;
}

export class UserInfo{
  userName:string;
  userPassword:string;
  firstName:string;
  lastName:string;
  address:string;
  emailID:string;
  contactNo:number;

}
