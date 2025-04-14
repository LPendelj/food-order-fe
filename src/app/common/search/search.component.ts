import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchActions } from './searchStore/actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['searchTerm'])
      this.searchTerm = params['searchTerm'];
    })
  }

  search(): void{
    if(this.searchTerm){
      this.store.dispatch(searchActions.searchFood({searchTerm: this.searchTerm}));
      // this.router.navigateByUrl(`/search/${this.searchTerm}`)
    }
    
  }

}
