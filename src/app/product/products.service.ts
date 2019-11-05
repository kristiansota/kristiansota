import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class ProductsService {
    
    
    constructor(private http: HttpClient){
        this.getProducts().subscribe(data => {
            console.log(data);
        });
    }

    products: Product[] = [];
    
      public getProducts(): Observable <Product[]>{
          return this.http.get<Product[]>('http://localhost:3000/products');
      }
}