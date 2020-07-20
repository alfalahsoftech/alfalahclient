import { Component, OnInit } from '@angular/core'
import { RestSrvc } from '../srvc/srvc.service'
import { log } from 'util';
import { HttpClient } from '@angular/common/http';
@Component(
    {
        selector: 'dispSoldMedi',
        templateUrl: 'dispSoldMedi.html',
        styleUrls: ['dispSoldMedi.css']
    }
)
export class DispSoldMedi implements OnInit {

    itemsArray = [];

    constructor(private restSrvc: RestSrvc, private _httpClient: HttpClient) { }

    page = 1;
    pageSize = 10;
    recordFrom = 1;
    recordTo = this.pageSize;
    noOfItems = this.itemsArray.length;

    get arrayOfData(): any[] {
        if (this.noOfItems > 0) {
            if (this.page == 1) {
                this.recordFrom = this.page;
                this.recordTo = this.pageSize > this.noOfItems ? this.noOfItems : this.pageSize;
            } else {
                this.recordFrom = this.pageSize * (this.page - 1) + 1;
                this.recordTo = this.pageSize * this.page > this.noOfItems ? this.noOfItems : this.pageSize * this.page;
            }
        } else {
            this.recordFrom = 0;
            this.recordTo = 0;
        }

        return this.itemsArray
            .map((obj, i) => ({ id: i + 1, ...obj }))
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

    fetchData() {
        this._httpClient.get(this.restSrvc.appBaseUrl + 'rest/medi/dispSoldMedi').subscribe((resp: any[]) => {
            this.itemsArray = resp;
            this.noOfItems = this.itemsArray.length;
            console.log('dispSoldMedi=>>>>>>>>>>>>>');

            console.log(this.itemsArray);
        })
    }
    ngOnInit() {
        this.fetchData();
        // this.itemsArray = new DisplayItemsArray();
    }
    actions(pk: number, type: string) {
        console.log("primaryKey= " + pk + ' type =' + type);
    }

    isActive(isActive: any) {
        return isActive == 1;
    }
}

export class DisplayItemsArray {
    itemID: string;
    name: string;
    weight: string;
    baseUnit: string;
    unitCost: string;
    gstPerc: string;
    costPrice: string;
    salingPrice: string;
    notes: string;
    isActive: string;
}