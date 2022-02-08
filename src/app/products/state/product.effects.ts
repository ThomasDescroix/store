import { Injectable } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadProducts, loadProductsFailure, loadProductsSuccess, updateProduct, updateProductFailure, updateProductSuccess } from "./product.actions";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions, 
        private productService: ProductService
    ) {}

    loadProducts$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(loadProducts),
                mergeMap(() => this.productService.getProducts()
                    .pipe(
                        map(products => loadProductsSuccess({ products })),
                        catchError(error => of(loadProductsFailure({ error })))
                    )
                )
            );
    });

    updateProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(updateProduct),
                concatMap(action => 
                    this.productService.updateProduct(action.product)
                        .pipe(
                            map(product => updateProductSuccess({ product })),
                            catchError(error => of(updateProductFailure({ error })))
                        ))
            )
    })
}