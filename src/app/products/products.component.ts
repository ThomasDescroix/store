import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './models/Product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'sto-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  products!: Product[];
  selectedProduct!: Product;
  sub!: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => { 
        if (currentProduct)
          this.selectedProduct = currentProduct
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeSelectedProduct(product: Product) {
    this.productService.changeSelectedProduct(product);
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: p => this.productService.changeSelectedProduct(p),
      error: err => this.errorMessage = err
    });
  }
}
