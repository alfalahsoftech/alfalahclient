import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { RestSrvc } from '../srvc/srvc.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../auth/user';
import {CompService} from '../service/compservice'
import { from } from 'rxjs/observable/from';

@Component({
    selector: "dsd-div",
    templateUrl: "./dsdDiv.component.html",
    styleUrls: ['./dsdDiv.component.css']
})
export class DsdDivComponent implements OnInit {
    showHeader = false;
    constructor(private restSrvc: RestSrvc, private router: Router,private compSvc: CompService) { }
    ngOnInit(): void {
        this.showHeader = false;
        console.log('Loging page starting to load');

    }
    user:User = {
        userName: "abd",
        password: "abd123",
        isValidUser:'Yes',
        isSettingsAllowed:false,
        menuIID:'SuperUser'
    }
credentialMsg ='';

    login() {
        var x = location.origin;
        console.log(" Request from origin: "+x);
        
            console.log('Login button clicked')
        this.restSrvc.reqRespAjax('rest/login', this.user).subscribe((res: User) => {
            console.log(JSON.stringify(res))

//cookie  about 40000byte capacit    |data stored using cookie is sent back to the server
//sessionStorage about 5mb,cleared after browser or tab close            | data stored using local storage isn't sent back to the server. All data stays on the client
//localStorage about 2MB to 10MB     | data stored using local storage isn't sent back to the server.. All data stays on the client

            if (res.isValidUser === 'Yes') {
                //localStorage.setItem('currentUser', JSON.stringify(this.user));
                sessionStorage.setItem('currentUser', JSON.stringify(this.user));
                this.compSvc.myMethod(this.user);
                this.router.navigate(['dashboard']);
            } else {
                console.log($('#failmsg'))
                $('#failmsg').css('display','block');
                $('#failmsg').val().toString().blink();
                this.credentialMsg ='User name or Password are wrong!';
                this.router.navigate(['login']);
            }
        });


        console.log("User = ===-===>" + this.user);
        console.log(this.user)
        this.showHeader = true;
        this.restSrvc.showHeader = true;

        //  this.header.isUserValid=true;

    }

}