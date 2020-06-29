import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {RestSrvc} from '../srvc/srvc.service'
@Component({
    selector: "dashboard",
    templateUrl: "afdashboard.html",
    styleUrls: ['dashboard.css']
})
export class AFDashboard implements OnInit {

    constructor(private http: HttpClient, private restSrvc:RestSrvc) { }
    todayDate = Date.now();
    todayData: any;
    itemToBeSoldArray: any[] = [];
    todayTotalQnty: number = 0;
    todayTotalAmt: number = 0;
    prevTotalQnty: number = 0;
    prevTotalAmt: number = 0;
    getData(): void {

        console.log('AFDashBoard getdata')
        this.http.get(this.restSrvc.appBaseUrl+'rest/dboard/today').subscribe(data => {
            console.log(data)
            this.todayData = data['total'];
            this.itemToBeSoldArray = data['items'];
            this.todayTotalQnty = data['currentDayData']['ttQnty']
            this.todayTotalAmt = data['currentDayData']['ttCash']


            this.prevTotalQnty = data['prevDayData']['ttQnty']
            this.prevTotalAmt = data['prevDayData']['ttCash']
        });
    }
    ngOnInit() {
        this.getData();
    }
}