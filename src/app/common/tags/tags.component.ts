import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food/food.service';
import { Tag } from 'src/app/shared/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {


  tags: Tag[] = [];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.tags = this.foodService.getAllTags();
  }

}
