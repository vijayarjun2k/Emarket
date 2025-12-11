import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product.interface';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  http = inject(HttpClient);
  constructor() { }

getProducts(){
  return this.http.get<IProduct[]>('https://fakestoreapi.com/products')
  .pipe(
    map(((products)=> {
      return products.map((product)=>{
        return {...product, quantity:1}
      })
    }))
  )
}
}
