import { NumberSymbol } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductsResponse } from 'src/app/common/GetProductsResponse';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-list-component',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 0 ;
  q: string | null | undefined;

  pageSize: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  page: number = 1;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listProducts();
    this.route.paramMap.subscribe(() => {
      this.pageSize = 0;
      this.totalElements = 0;
      this.totalPages = 0;
      this.page = 0;
      this.listProducts();
    });
  }

  listProducts() {
    // check if id paramter is available
    this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id')); // either found or 0
    this.q = this.route.snapshot.paramMap.get('q');

    if(this.q != null) {
      this.productService.searchProducts(this.q, this.page - 1).subscribe(data => this.processProductResult(data));
    }
    else {
      // now get the products for given id
      this.productService.getProductList(this.page - 1, this.currentCategoryId).subscribe(data => this.processProductResult(data));
    }
  }

  processProductResult(data: GetProductsResponse){
      this.products = data._embedded.products;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.page = data.page.number + 1;
  }

}
