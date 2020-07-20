import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user";

@Injectable()
export class UserService{
    constructor(
        private router: Router
      ) {}
    private loggedIn = new BehaviorSubject<boolean>(false); // {1}
    get isLoggedIn() {
        return this.loggedIn.asObservable(); // {2}
      }

      login(user: User){
        if (user.userName !== '' && user.password !== '' ) { // {3}
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
      }

      logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


  isUserLoggedIn:boolean;
    isValid(){

      //  if( localStorage.getItem('currentUser')){
        if( sessionStorage.getItem('currentUser')){
            console.log("user exists");
            this.isUserLoggedIn=true;
           return true;
       }
        console.log("UserService=============> isvalid");
        
        return false;
    }
}