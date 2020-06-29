import { Component, Input, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { RestSrvc } from "../srvc/srvc.service";

@Component({
selector:'viewDailyStuff',
templateUrl:'viewDailyStuff.html',
styleUrls:['viewDailyStuff.css']

})
export class ViewDailyStuf implements OnInit{
  
    @Input() dailyStuffObj:any;
    @Input() isView:any;
    workerDetail:any={jobCodePK:"",staffPK:"",isPresent:"",quantity:"",jobCode:""};
    workDayDetailArray:any=[this.workerDetail];
    jobCodeArray:any=[];
    staffArray:any = [];
    newWorkDetailArray:any=[];
    lbrWorkDetailsArray:any=[];

    constructor(private http:HttpClient,private modalService:NgbModal,private router:Router,private restSrvc:RestSrvc){}
    ngOnInit(){      
       console.log(this.dailyStuffObj)  // This will print current object
      
    }
    closeResult:string;
    open(content: any,isV:boolean) {
      this.isView = isV;
      console.log("======================== "+isV);
      if(this.isView){
        console.log('viewwwwwwwwwwwwww');
        
        this.getAllData();
      }else{
        this.getData();
      }
        // this.ngOnInit();
       
        this.newWorkDetailArray=[];
        this.workerDetail={jobCodePK:"",staffPK:"",isPresent:"",quantity:"",jobCode:""};
        this.workDayDetailArray=[this.workerDetail];
        console.log('open_this.workDayDetailArray.length->'+this.workDayDetailArray.length);
        console.log(content)
        const modalRef = this.modalService.open(content, { size:'lg', backdrop: 'static' ,windowClass:'div.addItem'}).result.then((result) => {
            console.log(this.workDayDetailArray)
           this.sendData();
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.workDayDetailArray=[this.workerDetail];
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    getAllData(){
      this.http.post(this.restSrvc.appBaseUrl+'rest/food/lbrDayDetail',{'eoStuffPK':this.dailyStuffObj['primaryKey']}).subscribe(resp=>{
       this.lbrWorkDetailsArray = resp;
       console.log(this.lbrWorkDetailsArray);
       
        
     });
    }
    getData(){
      this.getAllJobCode (); 
      this.getAllStaff();
    }
 
    sendData(){
       // this.workDayDetailArray.push({fkStuffID:this.dailyStuffObj['primaryKey']});
       this.getAndSet();
        this.http.post(this.restSrvc.appBaseUrl+'rest/food/addWorkerDayDetail',this.newWorkDetailArray).subscribe(resp=>{
           console.log(resp);
           this.router.navigate(['/dispDailyStuff'])
        });
       
    }

    getAllStaff() {
      this.restSrvc.reqRespAjax('rest/UserService/dispStaff', null).subscribe((res: any[]) => {
        this.staffArray = res;
        // this.custDetails.push()
        console.log(this.staffArray)
      });
    }
    getAllJobCode() {
        this.restSrvc.reqRespAjax('rest/settings/dispJobCode', null).subscribe((res: any[]) => {
          this.jobCodeArray = res;
          console.log(this.jobCodeArray)
        });
      }


    addNewRow(){
        this.workerDetail={jobCodePK:"",staffPK:"",isPresent:"",quantity:"",jobCode:""};
        this.workDayDetailArray.push(this.workerDetail);
    }
    deleteRow(index) {
        if (this.workDayDetailArray.length == 1) {
          // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
          return false;
        } else {
          this.workDayDetailArray.splice(index, 1);
          //  this.toastr.warning('Row deleted successfully', 'Delete row');  
          return true;
        }
      }
    

      selectedWorker(event:any){
    //     console.log(event.value);
    //     console.log(this.workDayDetailArray)
    //     console.log(this.workDayDetailArray[ this.workDayDetailArray.length-1])
    //  //   console.log(this.workDayDetailArray[ this.workDayDetailArray.length-1]['staffPK']);
    //       this.workDayDetailArray[ this.workDayDetailArray.length-1].staffPK=event.value.primaryKey;
    //       // this.getAndSet(event.value,true);
      }

      selectedJobCode(event:any,workerDetail:any) {
        // console.log(event.value);
        // console.log(this.workDayDetailArray)
        // console.log(this.workDayDetailArray[ this.workDayDetailArray.length-1]);
        // this.workDayDetailArray[ this.workDayDetailArray.length-1].jobCodePK=event.value.primaryKey;
        // // this.getAndSet(event.value,false);
        
      }

      getAndSet(){      
        this.workDayDetailArray.forEach((e:any) => {
       var  workDetail={jobCodePK:"",staffPK:"",isPresent:"",quantity:"",jobCode:"",fkStuffID:"",name:"",busiDate:""};

         workDetail.name = e.staffPK.firstName;
         workDetail.staffPK=e.staffPK.primaryKey;
         workDetail.jobCodePK=e.jobCodePK.primaryKey;
         workDetail.isPresent=e.isPresent;
         workDetail.quantity=e.quantity;
         workDetail.jobCode = e.jobCodePK.jobCode;
         workDetail.busiDate = this.dailyStuffObj['busiDate'];
         workDetail.fkStuffID=this.dailyStuffObj['primaryKey'];

          this.newWorkDetailArray.push(workDetail);
       
        });
        console.log(this.newWorkDetailArray);
        
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


}