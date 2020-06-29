import { Component, OnInit, Output, EventEmitter,Input,OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions ,} from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'editCustomerInfo-Mdl',
  templateUrl: './editCustomerInfo.html',
  styleUrls: ['./editCustomerInfo.css']
})
export class EditCustomerInfo implements OnInit,OnChanges{

  constructor(private modalService: NgbModal, private restSrvc: RestSrvc) { }
  @Output() messageEvent = new EventEmitter();
  @Input() custObj:any;
  ngOnChanges(){
    
    console.log('ngOnChanges called')
  }
  
  sendData() {
    console.log("Sending customer info request  to server");
    console.log(this.custObj);
    console.log(this.custInfo)
    delete this.custInfo["brandList"];
    delete this.custInfo['itemSoldList'];
    delete this.custInfo['lastOrderDate'];
    this.restSrvc.reqRespAjax("rest/UserService/updateCli", JSON.stringify(this.custInfo)).subscribe(dat => {
      console.log(dat)
    }, error => {
      console.error("Error saving customerInfo!");
      return Observable.throw(error);
    }

    );

    this.messageEvent.emit(this.custInfo);
  }

  closeResult: string;
  modalHeader = "Add  Customer";




  public callByOtherComp() {
    console.log("callByOtherComp")
  }
  public closeMdl() {

  }
  open(content: any) {
    this.ngOnInit();
    const modalRef = this.modalService.open(content, { size: 'lg',windowClass: 'my-class', backdrop: 'static' }).result.then((result) => {
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
    this.custInfo = this.custObj;
  //  this.custInfo=new CustomerInfo();
    console.log(this.custInfo);

  }
  custInfo: CustomerInfo
}


export class CustomerInfo {
  clientID: string;
  contactNo: number;
  clientName: string;
  city: string;
  state: string;
  routeName: string;
  district: string;
  stateCode:string;
  gstNo:string;
  notes:string;
  emailID:string;
  isActive:string;
  sun: boolean;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
}