import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showAddToCart: boolean = true;
} 