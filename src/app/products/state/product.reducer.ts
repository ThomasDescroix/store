import { createReducer, on } from "@ngrx/store";
import { loadProductsFailure, loadProductsSuccess, setCurrentProduct, updateProductFailure, updateProductSuccess } from "./product.actions";
import { ProductState } from "./product.state";

const initialState: ProductState = {
    products: [],
    currentProductId: null,
    error: ''
};

export const productReducer = createReducer<ProductState>(
    initialState,
    on(setCurrentProduct, (state, action): ProductState => {
        return { 
            ...state,
            currentProductId: action.currentProductId
        }
    }),
    on(loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        };
    }),
    on(updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id 
                ? action.product
                : item
        ); 
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        }
    }),
    on(
        loadProductsFailure,
        updateProductFailure,
        (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    })
)

