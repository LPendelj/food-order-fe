import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateFoodDto, Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {

  foodForm!: FormGroup
  isSubmitted = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  foodImage: any;


  get formControls(){
    return this.foodForm.controls;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  foodItem: CreateFoodDto = {
    name: '',
    price: 0,
    tags: [''],
    imageUrl: '',
    cookTime: '',
    favorite: false,
    stars: 0,
    origins: [''],
  }


  ngOnInit(): void {
    this.foodForm = this.fb.group({
      name: [''],
      price: [''],
      tags: [['']],
      imageUrl: [''],
      cookTime: [''],
      favorite: [false],
      stars: [0],
      origins: [['']]
    })
  }

  onSubmit() {
    this.foodItem = this.foodForm.value;
    console.log(this.foodItem);
  }

  onUpload(event: any) {
    this.fileInput.nativeElement.click()
    console.log(event)
  }

  onFileSelected(event: any){
    // this.foodImage = event.
    console.log(event)
    console.log(this.fileInput.nativeElement.value)
    const file = event.target.files[0]
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
       this.foodImage = e.target.result;
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  }

}
