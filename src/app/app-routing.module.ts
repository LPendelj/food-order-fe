import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodPageComponent } from './components/food-page/food-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/order-track-page/order-track-page.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { adminGuard } from './auth/guards/admin.guard';

const ROUTES: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'search/:searchTerm',
    component: HomeComponent
  },
  {
    path: 'tag/:tag',
    component: HomeComponent
  },
  {
    path: 'food/:id',
    component: FoodPageComponent
  },
  {
    path: 'cart-page',
    component: CartPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'track/:orderId',
    component: OrderTrackPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add-food',
    component: AddFoodComponent,
    canActivate: [authGuard, adminGuard] //adminGuard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
