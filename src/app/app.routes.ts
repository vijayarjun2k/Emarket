import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from "./component/home/home.component";
import { CustomerComponent } from "./component/customer/customer.component";
import { SupplierComponent } from "./component/supplier/supplier.component";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent } from "./component/login/login.component";
import { authGuard } from "./guard/auth.guard";
import { CustomerlistingComponent } from "./component/customerlisting/customerlisting.component";
import { AssociatelistingComponent } from "./component/associatelisting/associatelisting.component";
import { UserlistComponent } from "./component/userlist/userlist.component";
import { CartComponent } from "./component/cart/cart.component";
import { CheckoutComponent } from "./component/checkout/checkout.component";
import { PaymentComponent } from "./component/payment/payment.component";
import { OrderHistoryComponent } from "./component/order-history/order-history.component";

export const routes: Routes = [
        {path: '',component:  HomeComponent, canActivate:[authGuard]},
        {path:'associate',component:AssociatelistingComponent,canActivate:[authGuard]},
        {path:'customer',component:CustomerlistingComponent,canActivate:[authGuard]},
        {path:'user',component:UserlistComponent,canActivate:[authGuard]},
        {path: 'supplier',component: SupplierComponent},
        {path: 'register',component: RegisterComponent},
        {path: 'login', component:LoginComponent},
        { path: 'checkout', component: CheckoutComponent },
        { path: 'payment', component: PaymentComponent },
       {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'counter',
    loadComponent: () =>
      import('./component/counter/counter.component').then((a) => a.CounterComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./component/products/products.component').then((a) => a.ProductsComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./component/cart/cart.component').then((a) => a.CartComponent),
  },
  {
  path: 'order-history',
  loadComponent: () =>
    import('./component/order-history/order-history.component')
      .then(m => m.OrderHistoryComponent)
}

];
