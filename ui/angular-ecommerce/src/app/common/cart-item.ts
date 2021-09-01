import { Product } from "./product";

export class CartItem {
    
    id: number | undefined;
    name: string | undefined;
    unitPrice: string | undefined;
    imageUrl: string | undefined;

    quantity: number | undefined;
    
    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.unitPrice = product.unitPrice;
        this.imageUrl = product.imageUrl;
        this.quantity = 1;
    }
}