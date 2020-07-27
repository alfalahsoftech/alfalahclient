import { Component, style, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../auth/UserService';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CompService } from '../service/compservice';
import { User } from 'app/auth/user';
import { RestSrvc } from '../srvc/srvc.service';

@Component({
    selector: "header-comp",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    isUserValid: boolean = false;
    isLoggedIn: boolean = false
    isLoggedIn$: Observable<boolean>;
    user: User;
    isAndroid:boolean;
    
    constructor(private userService: UserService, private router: Router, private compSvc: CompService,private restSrvc:RestSrvc) { }
    ngOnInit() {
        console.log("HeaderComponent called");
        this.isLoggedIn$ = this.userService.isLoggedIn;
        this.isAndroid = this.restSrvc.isAndroid();
        console.log("Device detected isAndroid: "+this.isAndroid);
        
    }

     openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
       closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }

    ngAfterViewInit() {

        this.compSvc.myMethod$.subscribe((data) => {
            console.log(data);
            this.user = data;
            this.menus.forEach(menu => {
                console.log(menu);
                if (this.user.menuIID === menu.IID) {
                    console.log(menu);
                    this.headers = menu.menuArray;
                }
            })
        });
    }
    logout() {
//cookie  about 40000byte capacit    |data stored using cookie is sent back to the server
//sessionStorage about 5mb,cleared after browser or tab close           | data stored using local storage isn't sent back to the server. All data stays on the client
//localStorage about 2MB to 10MB     | data stored using local storage isn't sent back to the server.. All data stays on the client

        // localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
        console.log("User has been logout.");

    }



    // headers = [
    //             { name: 'Order', url: '/order' }, 
    //             { name: 'Bill/Pay', url: '/mediBill' },
    //             { name: 'SoldItems', url: '/allSoldItems' }
    //         ];

            headers = [
                { name: 'Bill/Pay', url: '/mediBill' }
                
            ];
    // superUser=[{ name: 'Cash/Sales', url: '/csh' },{ name: 'Reports', url: '/rpt' },{ name: 'Order', url: '/order' }, { name: 'Bill/Pay', url: '/bill' }];
    // staffUser=[{ name: 'Item', url: '/item' }, { name: 'Bill/Pay', url: '/bill' }];
    menus = [
        {
            IID: 'SuperUser',
            menuArray: [
                         { name: 'Cash/Sales', url: '/csh' },
                        { name: 'Reports', url: '/rpt' },
                        { name: 'Order', url: '/order' }, 
                        { name: 'Bill/Pay', url: '/mediBill' },
                         { name: 'SoldItems', url: '/allSoldItems' }
                    ]
        },
        { IID: 'STAFF', menuArray: [{ name: 'Item', url: '/item' }, { name: 'Bill/Pay', url: '/bill' }] }
    ]
}



