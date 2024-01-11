import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  isSubmitted = false;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    console.log("submitted");
    
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    alert(`email: ${this.fc['email'].value},
      password: ${this.fc['password'].value}`)
  }

}
