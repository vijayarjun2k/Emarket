import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient,withFetch } from '@angular/common/http';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { UserReducer } from './Store/User/User.Reducer';
import { UserEffect } from './Store/User/User.Effects';
import { AppEffects } from './Store/Common/App.Effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AssociateEffects } from './Store/Associate/Associate.Effects';
import { AssociateReducer } from './Store/Associate/Associate.Reducer';

import { cartReducer } from './states/cart/cart.reducer';
import { ProductReducer } from './states/product/product.reducer';
import { counterReducer } from './states/counter/counter.reducer';
import { ProductEffect } from './states/product/product.effect';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),

    importProvidersFrom(FormsModule, ReactiveFormsModule),

    //  Required for HttpClient services
    provideHttpClient(withFetch()),

    // NGRX
    provideStore({
      user: UserReducer
    }),
    provideState('associate', AssociateReducer),
    provideState({ name: 'counter', reducer: counterReducer }),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'product', reducer: ProductReducer }),
    provideEffects([UserEffect, AppEffects, AssociateEffects,ProductEffect]),
    provideStoreDevtools({ maxAge: 25,logOnly: false,
      trace: true,
      traceLimit: 75, }),
    provideRouterStore(),

    provideAnimationsAsync(),
    provideAnimations(), provideAnimationsAsync()
  ],
};
