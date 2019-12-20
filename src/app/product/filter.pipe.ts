import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[], searchText: string): Product [] {
    if(!products || !searchText) {
        return products;}
    
searchText = searchText.toLowerCase();
return products.filter( products => {
      return products.name.toLowerCase().includes(searchText) || 
      products.description.toLowerCase().includes(searchText);
    });
   }
}