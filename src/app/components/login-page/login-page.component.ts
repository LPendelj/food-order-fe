import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { selectIsLoading } from './store/reducers';
import { authActions } from './store/actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  data$: any

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];

    this.data$ = combineLatest({
      selectIsLoading: this.store.select(selectIsLoading),
    });
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){

    this.isSubmitted = true;
    if(this.loginForm.invalid) {
      console.log('form invalid');

      return;
    }

    const request = {
      email: this.fc['email'].value,
      password: this.fc['password'].value
    };

    this.store.dispatch(authActions.loginUser({ request }));
  }

}
