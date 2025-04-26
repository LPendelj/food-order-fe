import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/components/login-page/store/reducers';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartQuantity=0;
  user!:User;
  constructor(
    private cartService:CartService,
    private userService:UserService,
    private store: Store
    ) {

   }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })
    this.store.select(selectUser).subscribe((user) => {
      user? this.user = user : null
    })


    // this.userService.userObservable.subscribe((newUser: User) => {
    //   this.user = newUser;
    // })
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user? this.user.token : false;
    // return this.user.token;
  }
}
