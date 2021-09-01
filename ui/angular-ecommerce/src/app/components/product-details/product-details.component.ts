import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item'
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product : Product = new Product();
  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>this.handleProductDetails());
  }

  handleProductDetails() {
    const theProductId : number= Number(this.route.snapshot.paramMap.get("id"));
    console.log(`product details id = ${theProductId}`);
    this.productService.getproductDetails(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart() {
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}
