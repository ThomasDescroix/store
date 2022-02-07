import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'sto-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {
  @Input()
  products!: Product[];

  @Output()
  selectProductEvent = new EventEmitter<Product>();

  constructor() {}

  onClickProduct(product: Product) {
    this.selectProductEvent.emit(product);
  }
}
