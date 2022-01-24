import { Component, OnInit } from '@angular/core';
import { DashboardType } from 'src/types/dashboard.types'
import { BackendService } from 'src/app/services/backend.service';
import { Chart, registerables } from 'node_modules/chart.js'
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
        const data = responseApi.data as DashboardType[];
        this.categories = data;
        const dataChart = this.getFormatDataChart('Categorias', data);
        this.drawChart('categories', dataChart);
        this.getCount();
      }
      else
        this.categories = [];
    });
  }

  getStatus() {
    this.backendService.getStatus().subscribe((responseApi) => {
      if(responseApi.success){
        const data = responseApi.data as DashboardType[];
        this.status = data;
        const dataChart = this.getFormatDataChart('Estado', data);
        this.drawChart('status', dataChart);
      }
      else
        this.status = [];
    });
  }

  getFormatDataChart(label: string, data: any){
    let labels = []
    let dataValues = []
    let countOther = 0;

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      if(index < 5){
        labels.push(item.argument);
        dataValues.push(item.count);
      }
      else {
        countOther = countOther + item.count
      }
    }

    if(countOther > 0) {
      labels.push('Otros');
      dataValues.push(countOther);
    }

    let dataChart = {
      labels,
      datasets: [{
        label,
        data: dataValues,
              backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
        borderWidth: 1
      }]
    }

    return dataChart;

  }

  drawChart(ctx: string, data: any) {
    Chart.register(...registerables);
    const myChart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
            legend: {
              labels: {
                boxWidth: 0
              }
            }
          }
      }
  });
  }

}
