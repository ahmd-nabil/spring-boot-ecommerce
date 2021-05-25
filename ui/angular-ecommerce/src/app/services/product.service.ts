import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoriesUrl = 'http://localhost:8080/api/product-category';
  private default_size = 20;
  constructor(private httpClient: HttpClient) { }

  getProductList(page: number, theCategoryId: number): Observable<GetProductsResponse> {
    let searchUrl = `${this.baseUrl}?page=${page}&size=${this.default_size}`;
    // if we have category id then we will search by id
    // build the search url based on the REST api from springboot
    if(theCategoryId != 0)
      searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${page}&size=${this.default_size}`;
    return this.httpClient.get<GetProductsResponse>(searchUrl);
  }

  searchProducts(q: string, page: number) : Observable<GetProductsResponse> {
    const theSearchUrl = `${this.baseUrl}/search/findByNameContaining?q=${q}&page=${page}&size=${this.default_size}`;
    return this.httpClient.get<GetProductsResponse>(theSearchUrl);
  }
  
  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetProductCategoriesResponse>(this.categoriesUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }

  getproductDetails(theProductId: number) : Observable<Product> {
    const theSearchUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(theSearchUrl);
  }
}

interface GetProductsResponse {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
    }
}

interface GetProductCategoriesResponse {
  _embedded: {
    productCategories: ProductCategory[];
  }
}
