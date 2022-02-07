import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/Product';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private products!: Product[];

  private selectedProductSource = new BehaviorSubject<Product | null>(null);
  selectedProductChanges$ = this.selectedProductSource.asObservable();

  constructor(private httpClient: HttpClient) {}
  
  getProducts(): Observable<Product[]> {
    if (this.products)
      return of(this.products);

    return this.httpClient.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => this.products = data),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.httpClient.put<Product>(url, product, { headers })
      .pipe(
        tap(() => {
          const index = this.products.findIndex(item => item.id === product.id);
          if (index > -1) 
            this.products[index] = product;
        }),
        map(() => product),
        catchError(this.handleError)
      );
  }

  changeSelectedProduct(selectedProduct: Product) {
    this.selectedProductSource.next(selectedProduct);
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent)
      errorMessage = `An error occured: ${err.error.message}`;
    else 
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    return throwError(() => errorMessage);
  }
}