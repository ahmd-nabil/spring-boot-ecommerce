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

  totalQuantityValue: number = 0;
  totalPriceValue: number = 0;

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

  updateQuantity(item: CartItem, newQuantity: number) {
    let index: number = this.cartItems.findIndex(element => element.id === item.id);
    const prevQuantity = this.cartItems[index].quantity;
    const unitPrice = this.cartItems[index].unitPrice;
    if(prevQuantity !== undefined && unitPrice !== undefined) {
      this.totalQuantityValue += newQuantity - prevQuantity;
      this.totalPriceValue += (newQuantity - prevQuantity) * (+unitPrice);
      this.cartItems[index].quantity = newQuantity;
    }
    if(newQuantity == 0) {
      this.cartItems.splice(index, 1);
    }
    this.totalQuantity.next(this.totalQuantityValue);
    this.totalPrice.next(this.totalPriceValue);
  }
}
