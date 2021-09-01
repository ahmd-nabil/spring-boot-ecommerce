import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.totalQuantity = this.cartService.totalQuantityValue;
    this.totalPrice = this.cartService.totalPriceValue;
    this.cartService.totalQuantity.subscribe(value => this.totalQuantity = value);
    this.cartService.totalPrice.subscribe(value => this.totalPrice = value);
  }

  updateQuantity(tempItem: CartItem, newQuantity: number) {
    this.cartService.updateQuantity(tempItem, newQuantity);
  }
}
