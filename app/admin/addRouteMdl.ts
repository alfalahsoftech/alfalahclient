import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'addRouteMdl',
  templateUrl: './addRouteMdl.html',
  styleUrls: ['./addRouteMdl.css']
})
export class  AddRouteMdl implements OnInit {

  constructor(private modalService: NgbModal, private restSrvc: RestSrvc) { }
  @Output() messageEvent = new EventEmitter();
  @Input() custObj:any;

  
  sendData() {
    console.log("Sending  info request  to server_ Route");
    
    console.log(this.route)
    this.restSrvc.reqRespAjax("rest/food/addRoute", JSON.stringify(this.route)).subscribe(dat => {
      console.log(dat)
    }, error => {
      console.error("Error saving route!");
      return Observable.throw(error);
    }

    );

    this.messageEvent.emit(this.route);
  }

  closeResult: string;
  modalHeader = "Add  Route";


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
   this.route=new Route();

  }
  route:Route;
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

export class Route{
  routeName:string;
  stateName:string;
  notes:string;
  isActive:string;
  sun: boolean;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;

}
