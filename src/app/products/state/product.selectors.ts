import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../models/Product";
import { ProductState } from "./product.state";

export const selectProductFeatureState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
    selectProductFeatureState,
    (state) => state.products
);

export const selectCurrentProductId = createSelector(
    selectProductFeatureState,
    (state) => state.currentProductId
);

export const selectCurrentProduct = createSelector(
    selectProductFeatureState,
    selectCurrentProductId,
    (state, currentProductId) => {
        return state.products.find(p => p.id === currentProductId);
    }
);

export const selectError = createSelector(
    selectProductFeatureState,
    (state) => state.error
);

