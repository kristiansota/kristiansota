import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class ProductsService {
    
    
    constructor(private http: HttpClient){
        this.getProducts().subscribe(data => {
            this.products = data
            console.log(data);
        });
    }

    products: Product[] = [];
    
      public getProducts(): Observable <Product[]>{
          return this.http.get<Product[]>('http://localhost:3000/products');
      }

      addNewProduct(p: Product){
        return this.http.post<Product>('http://localhost:3000/products',p);
      }

      onDeleteProduct(product: Product): Observable<void>{
        return this.http.delete<void>(`http://localhost:3000/products/${product.id}`);
      }

      onUpdateProduct(p: Product){
            return this.http.put(`http://localhost:3000/products/${p.id}`,p);
      }
}