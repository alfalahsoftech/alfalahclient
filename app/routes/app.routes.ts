import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component'
// import { LoginComponent } from '../login/login.component';
// import { AuthGuard } from '../auth/auth.guard';
import { DsdDivComponent } from '../login/dsdDiv.component';
import { Item } from '../not in use/item.component';
import { RoutesComponent } from '../admin/routes.component';
import { commentCmp } from '../comment/commentCmp';
import { commentDetailsCmp } from "../comment/commentDetailsCmp";
import { CashAndSalesCmp } from '../csh/cashandsalesCmp';
import { AppComponent } from '../app.component';
import { AuthGuardService } from '../auth/AuthGuardService';
import { AFDashboard } from '../dashboard/afdashboard';
import { HomeLayoutComponent } from '../layouts/HomeLayoutComponent';
import { LoginComponent } from '../login/login.component';
import { LoginLayoutComponent } from '../layouts/LoginLayoutComponent';
import { DisplayItems } from '../item/displayItems';
import { EditItem } from '../item/editItem';
import { MedicineBiling } from '../bill/medicineBiling';
// import { CustDetailsComponent } from '../customer/CustDetailsComponent';
import { UserInfoDisplay } from '../admin/userInfoDisplay';
import { DisplaySoldItems } from '../item/displaySoldItems';
import { DisplayStaffInfo } from '../staff/displayStaffInfo';
import { DailyStuff } from '../dailyActivity/dailyStuff';
import { OrderCustomer } from '../order/order.customer';
import { DisplayRoutes } from '../admin/dispRoutes';
import { OrderItems } from '../order/orderItems';
import { OrderHistory } from '../order/orderHistory';
import { AddClientItem } from '../item/addClientItem';
import { DisplayStoreInfo } from '../store/displayStoreInfo';
import { DispJobCode } from '../admin/dispJobCode';
import { DispMedicine } from '../medi/dispMedicine';
import { EditMedicine } from '../medi/editMedicine';
import { AgarbattiBilling } from '../bill/agarbattiBilling';
import { DispSoldMedi } from '../medi/dispSoldMedi';


// import { LoginComponent } from '../security/LoginComponent';


// Route config let's you map routes to components
const routes: Routes = [


  {
    path: '',                       // {1}
    component: HomeLayoutComponent,
    canActivate: [AuthGuardService],       // {2}
    children: [
      {
        path: '',
        component: AFDashboard   // {3}
      },
      {
        path: 'dashboard',
        component: AFDashboard

      },
      {
        path: 'order',
        component: RoutesComponent,
      },
      {
        path: 'takeorder',
        component: OrderItems
      },
      {
        path: 'orderHistory',
        component: OrderHistory
      },
      {
        path: 'cli',
        component: CustomerComponent
      },
      // {

      //   path: 'UserService/cust/:pk',
      //   component: CustDetailsComponent
      // },
      {
        path: "route/:routePK",
        component:OrderCustomer
      },
      {
        path: "cmt",
        component: commentCmp,

        children: [
          {
            path: "cmtDetails",
            component: commentDetailsCmp
          }
        ]
      },
      {
        path: 'csh',
        component: CashAndSalesCmp
      },
      {
        path: 'allItems',
        component: DisplayItems
      },
      {
        path: 'allClientItems',
        component: DisplayItems,

      },
      {
        path: 'route',
        component: DisplayRoutes
      },
      {
        path: 'food/item/:pk',
        component: EditItem
      },
      {
        path: 'bill',
        component: AgarbattiBilling
      },
      {
        path: 'file/pdf',
        component: AgarbattiBilling
      },
      {
        path: 'mediBill',
        component: MedicineBiling
      },
      {
        path: 'medifile/pdf',
        component: MedicineBiling
      },
      {
        path:'user',
        component:UserInfoDisplay
      },
      {
        path:'genPDF',
        component:UserInfoDisplay
      },
      {
        path:'dboard/today',
        component:AFDashboard
      },
      {
        path:'allSoldItems',
        component:DisplaySoldItems
      },
      {
        path:'clientItems',
        component:AddClientItem
      }
      ,
      {
        path:'dispStaff',
        component:DisplayStaffInfo
      },
      {
        path:'dispDailyStuff',
        component:DailyStuff
      } ,
     {
        path: 'dispStore',
        component: DisplayStoreInfo
      },
      {
        path: 'dispJobCode',
        component: DispJobCode
      },
      {
        path: 'dispMedi',
        component: DispMedicine
      },
      {
        path:'medi/editMedi/:pk',
        component: EditMedicine
      } ,
      {
        path:'medi/editMedi/:pk',
        component: EditMedicine
      },
      {
        path: 'dispSoldMedi',
        component: DispSoldMedi
      }
    ]
  },
  {
    path: '',
    component: DsdDivComponent, // {4}
    children: [
      {
        path: 'login',
        component: DsdDivComponent   // {5}
      }
    ]
  },
  // {
  //   path: '',
  //   component: AFDashboard,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: '',
  //   component: AFDashboard,
  // },
  // {
  //   path: 'dashboard',
  //   component: AFDashboard

  // },
  // { path: 'login', component: DsdDivComponent },
  // {
  //   path: 'cli',
  //   component: CustomerComponent
  // },
  // {

  //     path: 'cust/:id',
  //     component: Item
  //   },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  //{ path: 'login', component: LoginComponent },
  // map '/' to '/persons' as our default route
  // {
  //   path: '',
  //   redirectTo: '/persons',
  //   pathMatch: 'full'
  // },
  //   {
  //     path:'order',
  //     component:RoutesComponent,
  //     children: [
  //     {
  //       path: "route",
  //       component: CustomerComponent
  //     },
  //     {
  //       path: "route/:routeName",
  //       component: CustomerComponent
  //     }
  //     ] 
  //  },
  //  {
  //    path:"route/:routeName",
  //    redirectTo:"cust"
  //  },
  //  {
  //    path:"cmt",
  //    component:commentCmp,

  //    children:[
  //     {
  //       path:"cmtDetails",
  //      component:commentDetailsCmp
  //      }
  //    ]
  //  },
  //  {
  //    path:'csh',
  //    component:CashAndSalesCmp
  //  },
  { path: '**', redirectTo: '' }

  //For this u can write children
  //,
  // {
  //   path:'order/route/:routeName',
  //  component:CustomerComponent
  //}
];

export const appRouterModule = RouterModule.forRoot(routes, { useHash: true ,onSameUrlNavigation: 'reload'});