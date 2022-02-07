import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/Product';

@Component({
  selector: 'sto-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnChanges {
  @Input()
  product!: Product;

  @Output()
  editProductEvent = new EventEmitter<Product>();

  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['product'].firstChange) {
      this.productForm.reset();
      this.productForm.patchValue({
        name: this.product.name,
        code: this.product.code,
        description: this.product.description
      })
    }    
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      description: ''
    })
  }

  onSubmitProductForm(): void {
    let product = { ...this.product, ...this.productForm.value };
    this.editProductEvent.emit(product);
  }
}
