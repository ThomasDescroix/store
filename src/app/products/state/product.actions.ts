import { createAction, props } from "@ngrx/store";
import { Product } from "../models/Product";

const ActionsType = {
    LOAD_PRODUCTS: '[Product] Load Products',
    LOAD_PRODUCTS_SUCCESS: '[Product] Load Products Success',
    LOAD_PRODUCTS_FAIL: '[Product] Load Products Fail',
    UPDATE_PRODUCT: '[Product] Update Product',
    UPDATE_PRODUCT_SUCCESS: '[Product] Update Product Success',
    UPDATE_PRODUCT_FAIL: '[Product] Update Product Fail',
    SET_CURRENT_PRODUCT: '[Product] Update Current Product'
};

export const loadProducts = createAction(
    ActionsType.LOAD_PRODUCTS
);

export const loadProductsSuccess = createAction(
    ActionsType.LOAD_PRODUCTS_SUCCESS,
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    ActionsType.LOAD_PRODUCTS_FAIL,
    props<{ error: string}>()
);

export const updateProduct = createAction(
    ActionsType.UPDATE_PRODUCT,
    props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
    ActionsType.UPDATE_PRODUCT_SUCCESS,
    props<{ product: Product }>()
);

export const updateProductFailure = createAction(
    ActionsType.UPDATE_PRODUCT_FAIL,
    props<{ error: string}>()
);

export const setCurrentProduct = createAction(
    ActionsType.SET_CURRENT_PRODUCT,
    props<{ currentProductId: number }>()
);