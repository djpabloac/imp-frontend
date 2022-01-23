import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/types/product.types';
import { BackendService } from 'src/app/services/backend.service';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: ProductType[] = [];
  search: string = '';
  loading: boolean = false;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.backendService.getProducts(this.search || '').subscribe((responseApi) => {
      this.loading = false;
      if(responseApi.success)
        this.products = responseApi.data as ProductType[];
      else
        this.products = [];
    });
  }
}
