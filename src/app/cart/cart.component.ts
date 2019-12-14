import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { CartService } from '../cart.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Product[] = [];
  quantityForm: FormGroup;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartProducts()
    .subscribe(data => this.cartProducts = data);

    this.quantityForm = this.fb.group({
      newQuantity: [null,Validators.required]
    });
  }

  deleteFromCart(i: number){
    this.cartService.onDeleteFromCart(this.cartProducts[i]).subscribe( () => 
    {this.cartProducts.splice(i,1); 
    console.log("You Deleted an item"); },
    error => {
      console.log(error);
    });

    this.snackBar.open('You have removed the item from your cart !', 'OK', {
      duration: 2500,
      verticalPosition: 'top'
     });
  }


  updateQuantity(p: any){
    if(this.quantityForm.valid && this.quantityForm.value.newQuantity > 0){

    this.cartService.onUpdateQuantity(p, this.quantityForm.value.newQuantity).subscribe(data => {
      p.quantity = this.quantityForm.value.newQuantity;
    });
    this.snackBar.open('You have successfully updated the quantity for this product !', 'OK', {
      duration: 3500,
      verticalPosition: 'top'
     } );
  } else {
    this.snackBar.open('The quantity of a product must be at least 1 !', 'OK', {
      duration: 2500,
      verticalPosition: 'top'
     } );
  }
 }
}
