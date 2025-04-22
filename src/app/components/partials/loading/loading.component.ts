import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../../login-page/store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    private store: Store
  ){
    
  }
  ngOnInit(): void {
    this.$isLoading = this.store.select(selectIsLoading)
  }

  $isLoading: Observable<boolean> = new Observable<boolean>();


}
 