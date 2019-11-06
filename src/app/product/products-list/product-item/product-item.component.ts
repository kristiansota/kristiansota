import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product.model';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartService.onAddToCart(this.product);
  }

}
