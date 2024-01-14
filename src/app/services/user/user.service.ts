import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from 'src/app/shared/constants/urls';
import { UserLogin } from 'src/app/shared/interfaces/UserLogin';
import { User } from 'src/app/shared/models/User';

 const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  logout() {
   this.userSubject.next(new User());
   localStorage.removeItem(USER_KEY);
   window.location.reload();
  }

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable!: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: UserLogin): Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin)
      .pipe(
        tap(
          {
            next: (user) => {
                this.setUserToLocalStorage(user);
                this.userSubject.next(user);
                this.toastrService.success(`Welcome to Foodmine ${user.name}`, 'Login successful')
            },
            error: (errorResponse) => {
                this.toastrService.error(errorResponse.error, 'Login failed!')
            }
          }
        )
      )
  }

  private setUserToLocalStorage(user: User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User()
  }
}
