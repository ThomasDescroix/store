import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from "../models/Product";

export class ProductData implements InMemoryDbService {

    createDb() {
        const products: Product[] = [
            {
                id: 1,
                name: 'First product',
                code: 'FP-001',
                description: 'First product description',
            },
            {
                id: 2,
                name: 'Second product',
                code: 'FP-002',
                description: 'Second product description',
            },
            {
                id: 3,
                name: 'Thrid product',
                code: 'FP-003',
                description: 'Third product description',
            }
        ]
        return { products };
    }
}