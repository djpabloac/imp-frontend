import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from 'src/app/products-list/products-list.component';
import { ProductDetailComponent } from 'src/app/product-detail/product-detail.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products/:id/detail', component: ProductDetailComponent },
  { path: 'products', component: ProductsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
