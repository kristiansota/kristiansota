import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartProducts()
    .subscribe(data => this.cartProducts = data);
  }

  deleteFromCart(i: number){
    this.cartService.onDeleteFromCart(this.cartProducts[i]).subscribe( () => {this.cartProducts.splice(i,1); 
    console.log("You Deleted an item"); },
    error => {
      console.log(error);
    });
  }

}
