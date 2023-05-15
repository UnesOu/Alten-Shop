import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Product } from 'app/shared/utils/interfaces/product';
import { SelectElem } from 'app/shared/utils/interfaces/selectElem';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  productsSearch: Product[];
  sortElements: SelectElem[];
  sortKey: string;
  sortOrder: number;

  sortField: string;
  constructor(private productService: ProductServiceService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    // GETTING THE LIST OF PRODUCTS
    this.productService.getProductList().then((data: any) => {
      this.products = data;
      this.productsSearch = data;
      console.log("this.products:::::", this.products);
    });
    // SORTING LIST ELEMENTS DEFINITION
    this.sortElements = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
    this.primengConfig.ripple = true;
  }
  onSortChange(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  // FILTER DATA BY VALUE AND RETURN THE LIST 
  filterData(event: any) {
    let valSearch = (event.target as HTMLInputElement).value;
    this.productsSearch = valSearch.trim() === '' ? this.products : this.products.filter(elem =>
      elem.name.toLowerCase().includes(valSearch.toLowerCase())
    );
  }
}
