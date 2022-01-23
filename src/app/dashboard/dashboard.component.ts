import { Component, OnInit } from '@angular/core';
import { DashboardType } from 'src/types/dashboard.types'
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories: DashboardType[] = [];
  status: DashboardType[] = [];
  count: number = 0;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getStatus();
  }

  getCount() {
    if(this.categories.length == 0)
      this.count = 0;
    for (const category of this.categories) {
      this.count = this.count + (category.count || 0);
    }
  }

  getCategories() {
    this.backendService.getCategories().subscribe((responseApi) => {
      if(responseApi.success){
        this.categories = responseApi.data as DashboardType[];
        this.getCount()
      }
      else
        this.categories = [];
    });
  }

  getStatus() {
    this.backendService.getStatus().subscribe((responseApi) => {
      if(responseApi.success)
        this.status = responseApi.data as DashboardType[];
      else
        this.status = [];
    });
  }

}
