import { Component } from "@angular/core";

@Component({
    selector: 'data-body',
    templateUrl: './data.body.html',
    styleUrls: ['./data.body.css']
  })
  
  export class DataBody {
 
    itemsArray=[];
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

    
  }