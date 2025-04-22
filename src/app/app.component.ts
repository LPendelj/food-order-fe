import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from './components/login-page/store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.$isLoading = this.store.select(selectIsLoading)
  }
  title = 'food-order-app';

  $isLoading: Observable<boolean> = new Observable<boolean>();
  constructor(
    private store: Store
  ) {}


    
}
