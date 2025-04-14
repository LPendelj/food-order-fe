import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './common/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './common/tags/tags.component';
import { FoodPageComponent } from './components/food-page/food-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { OrderItemListComponent } from './components/partials/order-item-list/order-item-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './components/order-track-page/order-track-page.component';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { searchFeatureKey, searchReducer } from './common/search/searchStore/reducers';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import  * as searchFoodEffect from './common/search/searchStore/effects';
import  * as loginEffects from './components/login-page/store/effects';
import { loginReducer } from './components/login-page/store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }),
    StoreModule.forRoot(loginReducer),
    StoreModule.forRoot(searchReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: isDevMode(),
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true
    }),
    EffectsModule.forRoot(searchFoodEffect),
    EffectsModule.forRoot(loginEffects),
    // provideEffects(searchFoodEffect)
  ],
  providers: [
     {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
