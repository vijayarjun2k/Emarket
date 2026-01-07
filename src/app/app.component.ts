import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenubarComponent } from './component/menubar/menubar.component';

import { Observable } from 'rxjs';
import { AppState } from './states/app.state';
import { selectCount } from './states/counter/counter.selector';
import { IProduct } from './shared/models/product.interface';
import { selectCartProducts } from './states/cart/cart.selector';
import { CartStore } from './Store/cart.store';
import { Store } from '@ngrx/store';
import { ProductsComponent } from './component/products/products.component';
import { SessionTimeoutComponent } from "./component/session-timeout/session-timeout.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { A11yModule } from '@angular/cdk/a11y';
import { TourService } from './component/tour/tour.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { Portal, PortalModule } from '@angular/cdk/portal';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    A11yModule,
    MenubarComponent,
    ProductsComponent,
    OverlayModule,
    PortalModule,
    RouterLink, SessionTimeoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'emarket';
  count$: Observable<number>;
  products$: Observable<IProduct[]>;
  cartStore = inject(CartStore);

  constructor(private store: Store<AppState>, private tour: TourService){
     this.count$ = this.store.select(selectCount);
    this.products$ = this.store.select(selectCartProducts);
  }

  ngAfterViewInit(): void {
  if (!localStorage.getItem('tourDone')) {
    this.tour.init([
      {
        selector: 'mat-list-item[routerlink="products"]',
        title: 'E-Marketplace',
        description: 'Start shopping by browsing products here.'
      },
      {
        selector: '.product-card',
        title: 'Products',
        description: 'Explore products and add them to your cart.'
      },
      {
        selector: '.add-to-cart-btn',
        title: 'Add to Cart',
        description: 'Add items to your cart.'
      },
      {
        selector: '.cart-icon',
        title: 'Cart',
        description: 'View selected items in your cart.'
      },
      {
        selector: '.checkout-btn',
        title: 'Checkout',
        description: 'Proceed to checkout and enter delivery address.'
      }
    ]);

    setTimeout(() => this.tour.start(), 800);
  }
}
}
