import { Product } from './product/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { User } from './user/user.model';
import { UserService } from './user/user.service';


@Injectable()
export class CartService {

    // _currentUser: User;
    actualUserId;

    constructor(private httpcart: HttpClient,
        private userService: UserService){
        this.getCartProducts().subscribe(data => {
            console.log(data);
        });

        // this.userService.currentUser.subscribe(data => {
        //     this._currentUser = data;
        //     console.log(data);
        // });
        

    }

    cartProducts: Product[] = [];

    public getCartProducts(): Observable <Product[]>{
        return this.httpcart.get<Product[]>(`http://localhost:3000/users/${this.userService.getActualUserId()}/cart`);
    }

    onAddToCart(p: Product,actualUserId: number) {
        this.httpcart.post<Product>(`http://localhost:3000/cart`,{
            name: p.name,
            price: p.price,
            imgPath: p.imagePath,
            description: p.description,
            p_id: p.id,
            quantity: 1,
            userId: actualUserId
        }).subscribe(error => {
            console.log(error);
        },error => {console.log(error)});
    }

    onDeleteFromCart(p: Product): Observable<void>{
        return this.httpcart.delete<void>(`http://localhost:3000/cart/${p.id}`);
    }

    onUpdateQuantity(p: any, newQuantity: number){
        return this.httpcart.put<any>(`http://localhost:3000/cart/${p.id}`,{
            name: p.name,
            price: p.price,
            imgPath: p.imgPath,
            description: p.description,
            p_id: p.p_id,
            quantity: newQuantity,
            userId: p.userId,
            id: p.id
        });
    }
}