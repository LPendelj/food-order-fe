import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent {


  @Input()
  label!: string

  @Input()
  bgColor = 'white';

  @Input()
  height = '100%';

  constructor(){

  }

}
