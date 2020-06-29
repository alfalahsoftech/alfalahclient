import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cust-modal',
  templateUrl: './cust-modal.component.html',
  styleUrls: ['./cust-modal.component.css']
})
export class  CustModalComponent implements OnInit {

  constructor(private modalService: NgbModal, private restSrvc: RestSrvc) { }
  @Output() messageEvent = new EventEmitter();
  @Input() custObj:any;
  successMsg:string;
  private routesArray = [];

  getAllData() {
    console.log('custObj===='+this.custObj)
    this.restSrvc.reqRespAjax('rest/food/allRoutes',null).subscribe((res: any[]) => {
      this.routesArray = res;
      console.log(this.routesArray)
    });
  }
  selectionChanged(ev){
    console.log(ev.value);
    this.custInfo.eoRoute = ev.value.primaryKey;
    console.log(this.custInfo.eoRoute);
}
  sendData() {
    console.log("Sending customer info request  to server");
    console.log(this.custObj);
    console.log(this.custInfo)
    this.restSrvc.reqRespAjax("rest/UserService/cli", JSON.stringify(this.custInfo)).subscribe(dat => {
      console.log(dat)
      this.successMsg="Record successfully updated";
    }, error => {
      console.error("Error saving customerInfo!");
      this.successMsg="Error occurred during update";
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
  ngOnInit() {
    this.getAllData();
    console.log('this.custObj===== '+this.custObj)
    // this.custInfo = this.custObj;
   this.custInfo=new CustomerInfo();
    console.log(this.custInfo);

  }
  custInfo: CustomerInfo
}


export class CustomerInfo {
  primaryKey:number;
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
  eoRoute:number;
}