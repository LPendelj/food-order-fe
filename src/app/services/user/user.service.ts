import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, debounceTime, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from 'src/app/shared/constants/urls';
import { UserLogin } from 'src/app/shared/interfaces/UserLogin';
import { UserRegister } from 'src/app/shared/interfaces/UserRegister';
import { User } from 'src/app/shared/models/User';
import { CartService } from '../cart/cart.service';

 const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public get currentUser():User{
    return this.userSubject.value;
  };


  logout() {
   this.userSubject.next(new User());
   this.cartService.removeCartFromLocalStorage()
   localStorage.removeItem(USER_KEY);
   window.location.reload();
  }

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable!: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: UserLogin): Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin)
  }

  register(userRegister: UserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      debounceTime(300),
    )
  }

  setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User()
  }
}
