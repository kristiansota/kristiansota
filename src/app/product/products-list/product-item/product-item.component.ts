import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product.model';
import { CartService } from 'src/app/cart.service';
import { ProductsService } from '../../products.service';

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
              private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts()
    .subscribe(data => this.products = data);
  }

  addToCart(){
    this.cartService.onAddToCart(this.product);
  }

  deleteProduct(){
    this.productDeleted.emit(this.product);
  }

  updateProduct(){
    this.productUpdated.emit(this.product);
  }
}
