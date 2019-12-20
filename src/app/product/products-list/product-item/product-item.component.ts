import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product.model';
import { CartService } from 'src/app/cart.service';
import { ProductsService } from '../../products.service';
import { UserService } from 'src/app/user/user.service';
import { MatSnackBar } from '@angular/material'
import { CartProduct } from 'src/app/cart/cartProduct.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Output() productDeleted = new EventEmitter <Product>();
  @Output() productUpdated = new EventEmitter <Product>();
  

  products: Product[] = [];
  cartProducts = [];
  cartIsEmpty: boolean;

  constructor(private cartService: CartService,
              private productsService: ProductsService,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productsService.getProducts()
    .subscribe(data => this.products = data);

    this.cartService.getCartProducts()
    .subscribe(data => this.cartProducts = data);

    console.log(this.userService.getActualUserId());
  }

  addToCart(product: Product){

    if(this.userService.getLoginStatus()){

      if(this.cartProducts.length){

        const foundProduct = this.cartProducts.filter(cartP => cartP.p_id === product.id);

        if (!foundProduct.length){
          this.cartService.onAddToCart(product, this.userService.getActualUserId());
          this.cartProducts.push({
            name: product.name,
            price: product.price,
            imgPath: product.imagePath,
            description: product.description,
            p_id: product.id,
            quantity: 1,
            userId: this.userService.getActualUserId()
      });
          this.snackBar.open('You have successfully added the item to your cart !', 'OK', {
          duration: 2500,
          verticalPosition: 'top'
     });
    } else {
        this.snackBar.open('This product has already been added to your cart !', '', {
          duration: 3500,
          verticalPosition: 'top'
        });
    }
  } else {
      this.cartService.onAddToCart(product, this.userService.getActualUserId());

      this.snackBar.open('You have successfully added the item to your cart !', 'OK', {
        duration: 2500,
        verticalPosition: 'top'
       });

      this.cartProducts.push({
        name: product.name,
        price: product.price,
        imgPath: product.imagePath,
        description: product.description,
        p_id: product.id,
        quantity: 1,
        userId: this.userService.getActualUserId()
  });
  }
    } else {
      this.snackBar.open('You have to log in first to add items to your cart !', 'OK', {
        duration: 3500,
        verticalPosition: 'top'
       });
    }

    
  }

  deleteProduct(){
    this.productDeleted.emit(this.product);

    this.snackBar.open('Product Deleted !', 'OK', {
      duration: 2500,
      verticalPosition: 'top'
     });
  }

  updateProduct(product: Product){
    this.productUpdated.emit(this.product);
  }

  getAdminStatus(){
    return this.userService.getAdminStatus();
  }
}
