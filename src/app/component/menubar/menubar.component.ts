import { Component, DoCheck, OnInit,inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Roleaccess, Userinfo } from '../../Store/Model/User.model';
import { getmenubyrole } from '../../Store/User/User.Selectors';
import { fetchmenu } from '../../Store/User/User.action';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatMenuModule} from "@angular/material/menu"
import {MatListModule} from "@angular/material/list"
import {MatIconModule} from "@angular/material/icon"
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';

import { Observable } from 'rxjs';
import { AppState } from '../../states/app.state';
import { selectCount } from '../../states/counter/counter.selector';
import { IProduct } from '../../shared/models/product.interface';
import { selectCartProducts } from '../../states/cart/cart.selector';
import { CartStore } from '../../Store/cart.store';
import { ProductsComponent } from '../products/products.component';
import { NgModule } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
//import { Home09Icon } from '@ncgr-shared/huge-icons/Home09Icon';
@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,
    RouterOutlet,
    MatBadgeModule,
    HugeiconsIconComponent
],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent implements DoCheck, OnInit {
  ismenuvisible = false;
  menulist !: Roleaccess[];
  count$: Observable<number>;
  products$: Observable<IProduct[]>;
  cartStore = inject(CartStore);
  constructor(private router: Router,private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
    this.products$ = this.store.select(selectCartProducts);

    this.router.events.subscribe(() => {
    const url = this.router.url;
    this.ismenuvisible = !(
      url.includes('login') || url.includes('register')
    );
  });
  }
  ngOnInit(): void {
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      const _obj = JSON.parse(jsonstring) as Userinfo;
      this.store.dispatch(fetchmenu({userrole:_obj.role}))
    }

    this.store.select(getmenubyrole).subscribe(item => {
      this.menulist = item;
    })
  }
  ngDoCheck(): void {
    const currentroute = this.router.url;
    if (currentroute === '/login' || currentroute === '/register') {
      this.ismenuvisible = false
    } else {
      this.ismenuvisible = true;
    }
  }
}

