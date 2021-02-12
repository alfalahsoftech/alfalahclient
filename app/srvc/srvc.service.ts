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
  isAndroid() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };
  showHeader = false;
  //////////////////////////////////////////////////////////////////  

  // appBaseUrl=   window.location.host =='clientdemoapp.herokuapp.com'?'https://clientdemoapp.herokuapp.com/':  'http://192.168.43.36:8080/alfalahsoftech/'
  // appBaseUrl=   window.location.host =='alfalahtech.herokuapp.com'?'https://alfalahtech.herokuapp.com/': (window.location.host =='localhost:3000' ? 'http://localhost:8080/alfalahsoftech/': 'http://192.168.43.36:8080/alfalahsoftech/')
  //https://al-falahsoftech.herokuapp.com/
  // appBaseUrl=   window.location.host =='al-falahsoftech.herokuapp.com'?'https://al-falahsoftech.herokuapp.com/': (window.location.host =='localhost:3000' ? 'http://localhost:8080/alfalahsoftech/': 'http://192.168.43.36:8080/alfalahsoftech/')
  //3 Feb 20201
  appBaseUrl=   window.location.hostname!='localhost'? window.location.origin: (window.location.host =='localhost:3000' ? 'http://localhost:8080/alfalahsoftech/': 'http://192.168.43.36:8080/alfalahsoftech/')
 
  /////////////////////////////////////////////////////////
    //////local
    
    //http://localhost:3000  if no internet connection then no IP address
// appBaseUrl ='https://alfalahtech.herokuapp.com/';
// appBaseUrl='http://192.168.43.36:8080/clientsDemoApp/'
  baseUrl:string =this.appBaseUrl+"rest/UserService";
  


  getAllData(url:string,extraData:any):any {
    
    return  this._httpClient.get(this.appBaseUrl+url);
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
    console.log('window.location===> '+window.location)
    console.log('window.location.host===> '+window.location.host)
    console.log('Below is the Request Map: =>')
    console.log(requestMap);
    urlStr = this.appBaseUrl+urlStr;
    
   // return this._http.get(urlStr)
   //  .map(this.extractDataOnSuccess)    
    this._httpClient.post(urlStr,requestMap).pipe(map(this.getResponse))
   .pipe(catchError.arguments(this.handleError))
}



   reqRespAjax(urlStr:string, requestMap:any){
    console.log('window ' + window);
    console.log('window.location===> ' + window.location);
    console.log('window.location.host===> ' + window.location.origin);
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

   fileReqRespAjax(urlStr:string, requestMap:any,contentType:string){
    console.log('File Sending :Below is the Request Map: =>')
    console.log(requestMap);
    urlStr = this.appBaseUrl+urlStr;
    var httpOptions;
    if(contentType){
       httpOptions = {
        headers: new HttpHeaders({
         
          'Content-Type':  contentType != null ? contentType : 'application/pdf'
          
        })
      };
    }else{
       httpOptions = {
        headers: new HttpHeaders({
        })
    };
  }
   
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

dummyArray=[
{name:'India'},
{name:'Pakistan'},
{name:'Aferica'},
{name:'Afghanistan'},
{name:'Kajakistan'},
{name:'America'},
{name:'Lebnan'},
{name:'Syria'},
{name:'Denmark'},
{name:'Rusia'},
{name:'Saudi Arabiya'}
]

}

export class DeleteObj{
  clsName:string;
  pk:string;
}