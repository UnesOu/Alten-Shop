import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from 'app/shared/utils/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {


  constructor(private http: HttpClient) { }
  getProductList(params?: any) {
    return this.http.get<any>('assets/products.json', { params: params })
      .toPromise()
      .then(res => <Product[]>res.data)
      .then(data => { return data; })
      .catch(error => {
        console.log('error getting data :', error);
      });
  }

}
