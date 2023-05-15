import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsAdminComponent } from './base/product/products-admin/products-admin.component';
import { ProductsComponent } from './base/product/products/products.component';

const routes: Routes = [
  {
    path: 'admin/products',
    component: ProductsAdminComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
