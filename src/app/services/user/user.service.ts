import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from 'src/app/shared/constants/urls';
import { UserLogin } from 'src/app/shared/interfaces/UserLogin';
import { User } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(new User());
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
}
