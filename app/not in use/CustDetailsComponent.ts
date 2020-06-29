import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestSrvc } from '../srvc/srvc.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'
// import { CustomerInfo } from '../cust-modal/cust-modal.component';

@Component(
  {
    selector: 'CustDetailsComponent',
    templateUrl: 'CustDetailsComponent.html',
    styleUrls: ['CustDetailsComponent.css']
  }
)
export class CustDetailsComponent implements OnInit {

  @Output() messageEvent = new EventEmitter();
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, private restSrvc: RestSrvc) { }
  closeResult: string;




  saveChanges() {
    console.log("Sending customer info request  to server");
    if (this.cust.isActive) {
      this.cust.isActive = '1';
    }

    delete this.cust["brandList"];
    delete this.cust['itemSoldList'];
    delete this.cust['lastOrderDate'];
    console.log(this.cust)
    this.restSrvc.reqRespAjax("rest/UserService/updateCli", JSON.stringify(this.cust)).subscribe(responseData => {
      console.log(responseData)

    }, error => {
      console.error("Error saving food!");
      return Observable.throw(error);
    }

    );

  }

  cust: any;
  pk: string;
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.pk = params.get("pk");
      console.log(params);
      this.fetchData(this.pk);
    });
    this.cust = new CustomerInfo();
  }

  fetchData(pk: string) {
    this.restSrvc.reqRespAjax('rest/UserService/cust/' + this.pk, '').subscribe(data => {
      this.cust = data;
      console.log(this.cust);
    });
  }
  // dropdownOptions = ['Kg', 'Pc', "gm", "Litter", "Bora", "Ton", "Kartoon"];
  dropdownOptions= ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar','Chandigarh','Dadra and Nagar Haveli','Daman and Diu','Lakshadweep','Delhi','Puducherry'];
  selectionChanged(ev) {
    console.log(ev.value);
    
    this.stateWithCodeArray.forEach(element => {
      if(element.name==ev.value){
        this.cust.stateCode = element.code;
        console.log('foundcode' +element.code)
        console.log('found' +element.name)
      }
    });

  }
  stateWithCodeArray =[
                        {name:'Andhra Pradesh',code:'28'},
                        {name:'Arunachal Pradesh',code:'12'},
                        {name:'Assam',code:'18'},
                        {name:'Bihar',code:'10'},
                        {name:'Chhattisgarh',code:'22'},
                        {name:'Goa',code:'30'},
                        {name:'Gujarat',code:'24'},
                        {name:'Haryana',code:'06'},
                        {name:'Himachal Pradesh',code:'02'},
                        {name:'Jammu and Kashmir',code:'01'},
                        {name:'Jharkhand',code:'20'},
                        {name:'Karnataka',code:'29'},
                        {name:'Kerala',code:'32'},
                        {name:'Madhya Pradesh',code:'23'},
                        {name:'Maharashtra',code:'27'},
                        {name:'Manipur',code:'14'},
                        {name:'Meghalaya',code:'17'},
                        {name:'Mizoram',code:'15'},
                        {name:'Nagaland',code:'13'},
                        {name:'Odisha',code:'21'},
                        {name:'Punjab',code:'03'},
                        {name:'Rajasthan',code:'08'},
                        {name:'Sikkim',code:'11'},
                        {name:'Tamil Nadu',code:'33'},
                        {name:'Telangana',code:'36'},
                        {name:'Tripura',code:'16'},
                        {name:'Uttar Pradesh',code:'09'},
                        {name:'Uttarakhand',code:'05'},
                        {name:'West Bengal',code:'19'},
                        {name:'Andaman and Nicobar',code:'35'},
                        {name:'Chandigarh',code:'04'},
                        {name:'Dadra and Nagar Haveli',code:'26'},
                        {name:'Daman and Diu',code:'25'},
                        {name:'Lakshadweep',code:'31'},
                        {name:'Delhi',code:'07'},
                        {name:'Puducherry',code:'34'}];
  //Actions
  back() {
    this.router.navigate(['/cli'], {
    });
  }
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