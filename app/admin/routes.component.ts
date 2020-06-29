import {Component} from "@angular/core";
import { RestSrvc } from "../srvc/srvc.service";

@Component({
    selector:'routes-component',
    templateUrl:"./routes.component.html",
    styleUrls:['./settingscss.css']
})
export class  RoutesComponent{
     constructor( private restSrvc: RestSrvc) { }

    ngAfterViewInit() {
        console.log('ngAfterViewInit-userinfodisp')
        
         //
        this.getAllData();
    
      }
      
      private routesArray = [];
    
      getAllData() {
        this.restSrvc.reqRespAjax('rest/food/allRoutes',null).subscribe((res: any[]) => {
          this.routesArray = res;
          console.log(this.routesArray)
        });
      }
    
}