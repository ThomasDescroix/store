import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './models/Product';
import { loadProducts, setCurrentProduct, updateProduct } from './state/product.actions';
import { selectCurrentProduct, selectError, selectProducts } from './state/product.selectors';

@Component({
  selector: 'sto-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  selectedProduct$: Observable<Product>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
    this.errorMessage$ = this.store.select(selectError);
    this.selectedProduct$ = this.store.select(selectCurrentProduct); 
    this.store.dispatch(loadProducts());   
  }

  changeSelectedProduct(product: Product) {
    console.log(product);
    if (product.id)
      this.store.dispatch(setCurrentProduct({ currentProductId: product.id }));
  }

  updateProduct(product: Product) {
    this.store.dispatch(updateProduct({ product }));
  }
}
