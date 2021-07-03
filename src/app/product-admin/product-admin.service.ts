import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  constructor(private http: HttpClient) { }

  /**
   * Get product details from API
   */
  public getProductList(): Observable<Product> {
    return this.http.get<Product>('assets/json/mock.json');
  }

}
