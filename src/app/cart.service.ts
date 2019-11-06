import { Product } from './product/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class CartService {


    constructor(private httpcart: HttpClient){
        this.getCartProducts().subscribe(data => {
            console.log(data);
        });
    }

    cartProducts: Product[] = [];

    public getCartProducts(): Observable <Product[]>{
        return this.httpcart.get<Product[]>('http://localhost:3000/cart');
    }

    onAddToCart(p: Product) {
        this.httpcart.post<Product>('http://localhost:3000/cart',p).subscribe(data => {console.log(data) });
    }

    onDeleteFromCart(p: Product): Observable<void>{
        return this.httpcart.delete<void>(`http://localhost:3000/cart/${p.id}`);
    }
}