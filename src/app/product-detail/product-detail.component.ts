import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductType } from 'src/types/product.types';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: ProductType = {}
  loading: boolean = false;

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    const ID = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.backendService.getProductById(ID).subscribe((responseApi) => {
      this.loading = false;
      if(responseApi.success)
        this.product = responseApi.data as ProductType;
      else
        this.product = {};
    });
  }

  goBack(): void {
    this.location.back();
  }

}
