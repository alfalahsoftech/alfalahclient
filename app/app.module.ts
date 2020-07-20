import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import {
//     MatButtonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatRippleModule
//   } from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
// import {HeaderComponent} from './header/header.component';
// import {LoginComponent} from './loginlogout/login.component';
import {DsdDivComponent} from './login/dsdDiv.component';
import { CustModalComponent } from './customer/cust-modal.component'
import { HeaderComponent } from './header/header.component';
import { PeopleService } from './service/CustomerSvcs';
import { appRouterModule } from './routes/app.routes';
import {HttpClientModule}  from '@angular/common/http';
//import {Http} from '@angular/http'
import { Item } from './not in use/item.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthService } from './auth/auth.service';
// import { AuthGuard } from './auth/auth.guard';
// import { LoginComponent } from './login/login.component';
import { RoutesComponent } from './admin/routes.component';
import { ItemSettingComponent } from './admin/itemsetting.component';
import { RestSrvc } from './srvc/srvc.service';
import { commentCmp } from './comment/commentCmp';
import { commentDetailsCmp } from "./comment/commentDetailsCmp";
import { CashAndSalesCmp } from './csh/cashandsalesCmp';
// import { LoginComponent } from './security/LoginComponent';
// import { AuthGuard } from './auth/auth.guard';
import { AuthGuardService } from './auth/AuthGuardService';
import { UserService } from './auth/UserService';
import { AFDashboard } from './dashboard/afdashboard';
import { HomeLayoutComponent } from './layouts/HomeLayoutComponent';
import { LoginLayoutComponent } from './layouts/LoginLayoutComponent';
import { LoginComponent } from './login/login.component';
import { AddItem } from './item/addItem';
import {DisplayItems} from './item/displayItems';
import {EditItem} from './item/editItem'
import { MedicineBiling} from './bill/medicineBiling';
import { startsWithPipe } from "./bill/startsWithPipe";
import { EditCustomerInfo } from './customer/editCustomerInfo';
import { UserInfoDisplay } from './admin/userInfoDisplay';
import { AddUserMdl } from './admin/addUserMdl';
import {EditUserInfo} from './admin/editUserInfo';
import { CompService } from './service/compservice';
import { DisplaySoldItems } from './item/displaySoldItems';
import { DisplayStaffInfo } from './staff/displayStaffInfo';
import { AddStaffMdl } from './staff/addStaffMdl';
import { EditStaffInfo } from './staff/editStaffMdl';
// import { DailyStuff } from './activity/dailyActivity/dailyStuff';
// import { ViewDailyStuf } from './activity/dailyActivity/viewDailyStuff';
import { OrderCustomer } from './order/order.customer';
import { AddRouteMdl } from './admin/addRouteMdl';
import { DisplayRoutes } from './admin/dispRoutes';
import { OrderItems } from './order/orderItems';
import { OrderHistory } from './order/orderHistory';
import { AddClientItem } from './item/addClientItem';
import { DailyStuff } from './dailyActivity/dailyStuff';
import { ViewDailyStuf } from './dailyActivity/viewDailyStuff';
import { OrderByPipe } from './dailyActivity/order-by.pipe';
import { AddStoreMdl } from './store/addStoreMdl';
import { DisplayStoreInfo } from './store/displayStoreInfo';
import { EditStoreMdl } from './store/editStoreMdl';
import { DispJobCode } from "./admin/dispJobCode";
import { AddMedicine } from './medi/addMedicine';
import { DispMedicine } from './medi/dispMedicine';
import { EditMedicine } from './medi/editMedicine';
import { AgarbattiBilling } from './bill/agarbattiBilling';
import { SearchComponent } from './srvc/search.component';
import { SearchByNamePipe } from './helper/search-by-name.pipe';
import { AFUtil } from './helper/util';
import { DispSoldMedi } from './medi/dispSoldMedi';
import { DataBody } from './header/data.body';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        appRouterModule,
        HttpClientModule,
        SelectDropDownModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule
      
        
        
        // ReactiveFormsModule,
        // MatButtonModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatRippleModule
    ],
    
    declarations: [
        AppComponent,
        DsdDivComponent,
        // LoginComponent,
        CustModalComponent,
        HeaderComponent,
        Item,
        CustomerComponent,
        LoginComponent,
        RoutesComponent,
        ItemSettingComponent,
        commentCmp,
        commentDetailsCmp,
        CashAndSalesCmp,
        AFDashboard,
        HomeLayoutComponent,
        LoginLayoutComponent,
        AddItem,
        DisplayItems,
        EditItem,
        EditCustomerInfo,
        UserInfoDisplay,
        AddUserMdl,
        EditUserInfo,
        DisplaySoldItems,
        AddStaffMdl,
        EditStaffInfo,
        DisplayStaffInfo,
        DailyStuff,
        ViewDailyStuf,
        OrderCustomer,
        AddRouteMdl,
        DisplayRoutes,
        OrderItems,
        OrderHistory,
        AddClientItem,
        OrderByPipe,
        AddStoreMdl,
        DisplayStoreInfo,
        EditStoreMdl,
        DispJobCode,
        AddMedicine,
        DispMedicine,
        EditMedicine,
        startsWithPipe,
        AgarbattiBilling,
        MedicineBiling,
        SearchComponent,
        SearchByNamePipe,
        DispSoldMedi,
        DataBody
        
    
    

    ],
    providers: [PeopleService,AuthService,RestSrvc,AuthGuardService,UserService,CompService,AFUtil],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
 