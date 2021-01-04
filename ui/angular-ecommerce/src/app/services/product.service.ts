import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products'
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // the base case is to get all 100 products
    let searchUrl = `${this.baseUrl}?size=100`;
    // if we have category id then we will search by id
    // build the search url based on the REST api from springboot
    if(theCategoryId != 0)
      searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&size=100`
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
