import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/Product';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(private httpClient: HttpClient) {}
  
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.httpClient.put<Product>(url, product, { headers })
      .pipe(
        map(() => product),
        catchError(this.handleError)
      );
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