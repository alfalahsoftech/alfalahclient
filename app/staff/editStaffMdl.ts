import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core'
import { RestSrvc } from '../srvc/srvc.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'editStaffMdl',
    templateUrl: './editStaffMdl.html',
    styleUrls: ['./editStaffMdl.css']
})

export class EditStaffInfo implements OnInit ,AfterViewInit,OnChanges{

    userInfo:UserInfo;
    headerName = 'Edit';
    @Input() userDetails:any;
    closeResult: string;
    modalHeader='Edit User Info';
    constructor(private restSrvc:RestSrvc,private modalService: NgbModal) { }
    ngOnInit() {
        console.log('ngOnInit')
        console.log(this.userDetails);
this.userInfo = this.userDetails;
    }
    ngAfterViewInit(){
        console.log('ngAfterViewInit');
        
        //this.userInfo = this.userDetails;
    }
    ngOnChanges(){
        console.log('ngOnChanges')
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
    sendData(): any {
    var v =    confirm('Are you sure,you want to save data?');
    console.log(this.userInfo)
    delete this.userInfo['lastPassChgDate'];
    this.restSrvc.reqRespAjax(this.restSrvc.baseUrl+'/updStaff/',this.userInfo).subscribe(data=>{
                console.log(data) ;
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
    getData(data:any):void{

        console.log('getData called=======>')
        console.log('data=>'+data);
        console.log(this.userInfo );
        console.log(this.userDetails);
        // this.activatedRoute.paramMap.subscribe(map=>{

        //     this.restSrvc.reqRespAjax(this.restSrvc.baseUrl+'/user/'+  map.get("pk"),'').subscribe(data=>{
        //         this.userInfo = data;
        //     });
        // });
        
    }
}


export class UserInfo {
    userName: string;
    // userPassword: string;
    firstName: string;
    lastName: string;
    address: string;
    // emailID: string;
    contactNo: number;

}