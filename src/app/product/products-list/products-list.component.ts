import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  newProduct: Product = new Product(null,"", null, "","");

  constructor(private productService: ProductsService) {

    console.log(this.products);
   }

  ngOnInit() {
    this.productService.getProducts()
    .subscribe(data => this.products = data);
    
  }

  onSubmit() {
    this.productService.addNewProduct(this.newProduct).subscribe(data => 
      {this.productService.getProducts().subscribe((productResponse: Product[]) => {this.products = productResponse});
    });
  }

  onProductDeleted(p: Product, id:number){
    this.productService.onDeleteProduct(p).subscribe( () => {
      this.products.splice(id,1);
  } );
  }

  onProductUpdated(p: Product){
    this.newProduct = p;
  }

  finalUpdate() {
    this.productService.onUpdateProduct(this.newProduct).subscribe( () => {
      } );

      this.newProduct = {
        id: null,
        name: '',
        price: null,
        description: '',
        imagePath: ''
      };
  }

}
