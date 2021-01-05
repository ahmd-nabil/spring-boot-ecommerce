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

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // the base case is to get all 100 products
    let searchUrl = `${this.baseUrl}?size=100`;
    // if we have category id then we will search by id
    // build the search url based on the REST api from springboot
    if(theCategoryId != 0)
      searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&size=100`;
    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProducts(q: string) : Observable<Product[]> {
    const theSearchUrl = `${this.baseUrl}/search/findByNameContaining?q=${q}`;
    return this.httpClient.get<GetProductsResponse>(theSearchUrl).pipe(
      map(response => response._embedded.products));
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
  }
}

interface GetProductCategoriesResponse {
  _embedded: {
    productCategories: ProductCategory[];
  }
}
