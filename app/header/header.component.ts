import { Component, style, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../auth/UserService';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CompService } from '../service/compservice';
import { User } from 'app/auth/user';

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
    constructor(private userService: UserService, private router: Router, private compSvc: CompService) { }
    ngOnInit() {
        console.log("HeaderComponent called");
        this.isLoggedIn$ = this.userService.isLoggedIn;
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

        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
        console.log("User has been logout.");

    }



    headers = [
                { name: 'Order', url: '/order' }, 
                { name: 'Bill/Pay', url: '/bill' },
                { name: 'SoldItems', url: '/allSoldItems' }
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
                        { name: 'Bill/Pay', url: '/bill' },
                         { name: 'SoldItems', url: '/allSoldItems' }
                    ]
        },
        { IID: 'STAFF', menuArray: [{ name: 'Item', url: '/item' }, { name: 'Bill/Pay', url: '/bill' }] }
    ]
}


