import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalQuantity: Subject<number> = new Subject();
  totalPrice: Subject<number> = new Subject();

  totalQuantityValue = 0;
  totalPriceValue = 0;

  constructor() {

  }

  addToCart(cartItem: CartItem) {
    if(this.itemExists(cartItem))
      return;
    this.cartItems.push(cartItem);
    this.totalQuantityValue += 1;
    this.totalPriceValue += cartItem.unitPrice == undefined ? 0 : +cartItem.unitPrice;
    this.totalQuantity.next(this.totalQuantityValue);
    this.totalPrice.next(this.totalPriceValue);
  }

  itemExists(cartItem: CartItem) {
    for(let tempItem of this.cartItems) {
      if(cartItem.id === tempItem.id)
        return true;
    }
    return false;
  }
}
