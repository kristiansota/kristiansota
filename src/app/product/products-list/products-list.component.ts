import { Component, OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { FormsModule, NgForm } from '@angular/forms'
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material'
import { ProductsCrudComponent } from '../products-crud/products-crud.component';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  newProduct: Product = new Product(null,"", null, "","");

  constructor(private productService: ProductsService,
              private userService: UserService,
              private dialog: MatDialog) {

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
    /// this.newProduct = p;
    this.updateProduct(p);

  }

  getAdminStatus(){
    return this.userService.getAdminStatus();
  }

  openDialog(){
    let dialogRef =this.dialog.open(ProductsCrudComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
        this.productService.getProducts()
        .subscribe(data => this.products = data);
      }
    });
    
  }

  updateProduct(product: Product) {
    let dialogRef =this.dialog.open(ProductsCrudComponent, {
      width: '60%',
      data: product
    });
    
    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
        this.productService.getProducts()
        .subscribe(data => this.products = data);
      }
    });
    
  }

}
