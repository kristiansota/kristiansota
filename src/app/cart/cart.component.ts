import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material'

import { GetCartProducts } from './store/cart.actions';
import { Store, select } from '@ngrx/store';
import { initialAppState, IAppState } from './store/app.state';
import { selectCartList } from './store/cart.selector';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts = [];
  quantityForm: FormGroup;
  // cartProducts$ = this.store.pipe(select(selectCartList));

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _snackBar: MatSnackBar,
    private cartService: CartService,
    private store: Store<IAppState>) { }

  ngOnInit() {
    this.cartService.getCartProducts()
    .subscribe(data => this.cartProducts = data);

    // this.store.dispatch(new GetCartProducts());

    this.quantityForm = this.fb.group({
      newQuantity: [null,Validators.required]
    });
  }

  deleteFromCart(i: number){

    let snackBarRef = this.snackBar.open('Are you sure you want to delete this item from your cart?', 'Yes!',  {
      duration: 5000,
      verticalPosition: 'top'
     });

     snackBarRef.onAction().subscribe(() => {

      this.cartService.onDeleteFromCart(this.cartProducts[i]).subscribe( () => 
      {this.cartProducts.splice(i,1); 

      console.log("You removed an item");},
      
      error => {
      console.log(error);
    });


    this.snackBar.open('Product removed successfully!', '', {
      duration: 3500,
      verticalPosition: 'top'
     });
    })

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
    this.quantityForm.reset();
    this.snackBar.open('The quantity of a product must be at least 1 !', 'OK', {
      duration: 2500,
      verticalPosition: 'top'
     } );
  }
 }
}
