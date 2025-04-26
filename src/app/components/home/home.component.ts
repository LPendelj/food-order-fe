import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectIsLoading } from '../login-page/store/reducers';
import { selectFoodData } from './store/reducers';
import { homeActions } from './store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
    ) { }

  data$ = combineLatest({
    selectIsLoading: this.store.select(selectIsLoading),
    selectFoods: this.store.select(selectFoodData)
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
        if(params.searchTerm){          
          this.store.dispatch(homeActions.getFoodDataBySearchTerm({searchTerm: params.searchTerm}))
        } else if(params.tag){
          this.store.dispatch(homeActions.getFoodDataByTag({tag: params.tag}))
        }  else {
          this.store.dispatch(homeActions.getFoodData())
        }
      }
    );
  }

}
