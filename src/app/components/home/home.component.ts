import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { selectItems } from 'src/app/common/search/searchStore/reducers';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods: any[] | null = [];

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private store: Store
    ) { }


  ngOnInit(): void {
    let foodsObservable: Observable<any[] | null>
    this.foodService.getAll();
    this.activatedRoute.params.subscribe(
      params=>{
        if(params['searchTerm']){
          // foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm'])
          foodsObservable = this.store.select(selectItems)
        
        // } else if(params['tag']){
        //   foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
        }  else {
          foodsObservable = this.foodService.getAll()
        }

        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
      }
    );
  }



}
