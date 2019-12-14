import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product.model';
import { CartService } from 'src/app/cart.service';
import { ProductsService } from '../../products.service';
import { UserService } from 'src/app/user/user.service';
import { MatSnackBar } from '@angular/material'

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

  constructor(private cartService: CartService,
              private productsService: ProductsService,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productsService.getProducts()
    .subscribe(data => this.products = data);

    console.log(this.userService.getActualUserId());
  }

  addToCart(){
    this.cartService.onAddToCart(this.product, this.userService.getActualUserId());

    this.snackBar.open('You have successfully added the item to your cart !', 'OK', {
      duration: 2500,
      verticalPosition: 'top'
     });
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
