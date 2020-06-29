import { Component, OnInit } from "@angular/core";
import { RestSrvc } from "./srvc.service";


@Component({
  selector:'msg-comp',
  templateUrl:'MessageComponent.html'
})
export class MessageComponent implements OnInit{
message:string;

  constructor(private srvc :RestSrvc){}
  users: User[];
  // displayMsg():string{
  //   return this.srvc.getMessage();
  // }
  ngOnInit(){
   this.srvc.getMessage().subscribe((str:string)=>this.message=str);
   console.log('message: = '+this.message)
   // this.srvc.getMessage().subscribe(data=>)
  this.srvc.getDataFromApp().subscribe((data) => this.users =data)
  console.log(this.users)
  // this.srvc.reqRespAjax().subscribe(resp=>{
  //   console.log(resp)
  // })

  this.srvc.postAuthAjax(
    {
     queryParamHash:{'actionID':'FDOrderController_getMessage'}
    }
  )
  .subscribe(r=>{
    console.log('he we got :) ....')
    console.log(r);
  }

  )

  }
}

export interface User{
 id:number;
 name:string;
 profession:string;
}