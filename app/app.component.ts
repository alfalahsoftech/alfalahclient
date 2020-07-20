import { Component, style, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { RestSrvc } from './srvc/srvc.service';
import { UserService } from './auth/UserService';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls :['./app.component.css']
})
 
export class AppComponent  {

    

header ="Start working on this";
appName = "DnDApp";
showHeader = false;
    constructor(private restSrvc: RestSrvc){
        console.log('##################location.host######## ='+window.location.host);
        
        this.showHeader = restSrvc.showHeader;
        console.log("AppComponent constructor called");
        
        $(window).on('beforeunload', function(){
            console.log("beforeUnload event!");
        })
      
        
        
    }

   
    
     openNav() {
     
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        }

     closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
     }
 }