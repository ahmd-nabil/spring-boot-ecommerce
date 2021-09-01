import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { validateLocaleAndSetLanguage } from 'typescript';

@Component({
  selector: 'app-cart-status-component',
  templateUrl: './cart-status-component.component.html',
  styleUrls: ['./cart-status-component.component.css']
})
export class CartStatusComponentComponent implements OnInit {
  totalQuantity: number = 0;
  totalPrice: number = 0.00;
  
  constructor(private cartService: CartService) {  
  }

  ngOnInit(): void {
    this.totalQuantity = this.cartService.totalQuantityValue;
    this.totalPrice = this.cartService.totalPriceValue;
    this.cartService.totalQuantity.subscribe(value => this.totalQuantity = value);
    this.cartService.totalPrice.subscribe(value => this.totalPrice = value);
  }

}
