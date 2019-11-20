import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.css']
})
export class ProductsCrudComponent implements OnInit {

  products: Product[] = [];

  newProduct: Product = new Product(null,"", null, "","");

  isUpdate: boolean = false;

  constructor(private productService: ProductsService, 
              private matDialogRef: MatDialogRef<ProductsCrudComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product) { }
            

  ngOnInit() {
    if (this.data) {
      this.isUpdate = true;
      this.newProduct = this.data;
    }
    // this.productService.getProducts()
    // .subscribe(data => this.products = data);
  }

  onSubmit(){
    if (!this.isUpdate) {
      this.productService.addNewProduct(this.newProduct).subscribe(data => {
        this.matDialogRef.close(true);
        // this.productService.getProducts().subscribe((productResponse: Product[]) => {this.products = productResponse});
      });
    } else {
      this.productService.onUpdateProduct(this.newProduct).subscribe(data => {
        this.matDialogRef.close(true);
        // this.productService.getProducts().subscribe((productResponse: Product[]) => {this.products = productResponse});
      });
    }
    
  }

  onClose(){
    this.matDialogRef.close(false);
  }

}
