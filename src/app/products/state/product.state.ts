import { Product } from "../models/Product";

export interface ProductState {
    products: Product[];
    currentProductId: number | null;
    error: string;
};