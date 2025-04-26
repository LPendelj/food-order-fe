import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from 'src/app/shared/constants/urls';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  getFoodById(foodId: string): Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }

  getFoodBySearchTerm(searchTerm: any): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  getFoodByTag(tag: string){
    return tag === "All" ?
    this.getAll():
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
  }
}
