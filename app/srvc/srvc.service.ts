import {HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders} from "@angular/common/http"
//import {Http,Response} from '@angular/http'
import { Injectable } from "@angular/core";
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { User } from './messageCompoent';

@Injectable()
export class RestSrvc {

  constructor(private _httpClient:HttpClient){

  }

  showHeader = false;
  //////////////////////////////////////////////////////////////////  
  appBaseUrl='http://localhost:8080/alfalahsoftech/'
  /////////////////////////////////////////////////////////
    
  baseUrl:string =this.appBaseUrl+"rest/UserService";
  


  getAllData(url:string,extraData:any):any {
    this.reqRespAjax(url,extraData).subscribe((res:any[]) => {
      return res;
    }, error => {
      console.error("Error in fetching data!");
      return Observable.throw(error);
    });
    
  }

  getClientDetails(){
      return this._httpClient.get(this.baseUrl+"/cli");
  }
  
   get_products(){
    return this._httpClient.get(this.baseUrl);
}
  
  //this going to be commentted because data can be asynchronous.but this is syncronuous
  //if it fetch data from db then it will take time and work as a asyncoronous 
  // getMessage():string{
      //     return "Hi This first message";
      // }
  // o we use Observable
  getMessage():Observable<string>{
      console.log('getmessage called')
     return this._httpClient.get(this.baseUrl+"/msg").pipe(map(this.getMsg))
 // return this.http.get(this.url+"/msg").pipe(map(this.getMsg))
  }
  getMsg(response:HttpResponse<Object>){
      console.log('getmsg method ')
      console.log(response['_body'])
      return response['_body'];
  }
  private extraParam:string='';
  setExtraPram(param:any){
      this.extraParam = param;

  }
  getExtraParam(){
      return this.extraParam;
  }
  // getUsers():Observable<User[]>{
  //     return this._http.get()
  //     }
  private extractResponse(response:HttpResponse<Object>){
      return response;
  }
  private errorHandle(response:HttpErrorResponse){ 
      return response.status.toString();
  }
  getDataFromApp():Observable<User[]>{
      console.log('11111111111')
      // return this._http.get("rest/UserService").map((res:Response) => res.json());
      // let req ='{}';
      //  this._http.post('rest/UserService',req)
      //         .map(this.extractResponse)
      //         .catch(this.errorHandle);
      
     /* return this.http.get(this.url)
              .pipe(map(this.getResponse))
             .pipe(catchError.arguments(this.handleError)) */
             return this._httpClient.get(this.baseUrl)
             .pipe(map(this.getResponse))
            .pipe(catchError.arguments(this.handleError))
  }
  getResponse(response:Response){
      console.log('getResponse33333333333333');
      console.log(response);
      return response;
      // return 
  }
  handleError(error:Response){
      console.log("You got error")
      console.log(error)
      return Observable.throw(error);
  }
  
  extractDataOnSuccess(response:HttpResponse<Object>){
      console.log('444444444444444')
      console.log(response);
      return response;
  }
  ajax(urlStr:string, requestMap:any){
    console.log('Below is the Request Map: =>')
    console.log(requestMap);
    urlStr = this.appBaseUrl+urlStr;
    
   // return this._http.get(urlStr)
   //  .map(this.extractDataOnSuccess)    
    this._httpClient.post(urlStr,requestMap).pipe(map(this.getResponse))
   .pipe(catchError.arguments(this.handleError))
}



   reqRespAjax(urlStr:string, requestMap:any){
       console.log('Below is the Request Map: =>')
       console.log(requestMap);
       urlStr = this.appBaseUrl+urlStr;
       
      // return this._http.get(urlStr)
      //  .map(this.extractDataOnSuccess)    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
          
        })
    };
     return   this._httpClient.post(urlStr,requestMap,httpOptions);
   }

   extraParamAjax(urlStr:string, requestMap:any,extraParam:any){
   
    const data={'data':requestMap,'extraPram':extraParam};
    console.log(' Request Map: with extrapram=>')
    console.log(data);
    urlStr = this.appBaseUrl+urlStr;
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'
       
     })
 };
  return   this._httpClient.post(urlStr,data,httpOptions);
}

   fileReqRespAjax(urlStr:string, requestMap:any){
    console.log('Below is the Request Map: =>')
    console.log(requestMap);
    urlStr = this.appBaseUrl+urlStr;
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/pdf'
       
     })
 };
  return   this._httpClient.post(urlStr,requestMap,httpOptions);
}
 
  postAuthAjax(requestMap:any){
      return this.reqRespAjax('rest/auth/ajax',requestMap);
  }
  postUnauthAjax(requestMap:any){
      return this.reqRespAjax('rest/unAuth/ajax',requestMap);
  }
  
  
  loginAjax(requestMap:any){

      return this.reqRespAjax('rest/login',requestMap);
  }
getDeleteJson(clsName:string,pk:string){
  return JSON.stringify({'clsName':clsName,'pk':pk+''});
}

}

export class DeleteObj{
  clsName:string;
  pk:string;
}