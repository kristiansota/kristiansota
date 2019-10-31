import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [
    new Product(1,'Dell Alienware T510',100.00,'Gaming PC With 8gb Graphics Card','https://upload.wikimedia.org/wikipedia/commons/8/88/AVADirect_God_Mode_Extreme_Gaming_PC.png'),
    new Product(1,'Dell Alienware T510',100.00,'Gaming PC With 8gb Graphics Card','https://upload.wikimedia.org/wikipedia/commons/8/88/AVADirect_God_Mode_Extreme_Gaming_PC.png'),
    new Product(1,'Dell Alienware T510',100.00,'Gaming PC With 8gb Graphics Card','https://upload.wikimedia.org/wikipedia/commons/8/88/AVADirect_God_Mode_Extreme_Gaming_PC.png'),
    new Product(1,'Dell Alienware T510',100.00,'Gaming PC With 8gb Graphics Card','https://upload.wikimedia.org/wikipedia/commons/8/88/AVADirect_God_Mode_Extreme_Gaming_PC.png')
  ];

  constructor() { }

  ngOnInit() {
  }

}
