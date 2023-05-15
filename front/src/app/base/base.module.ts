import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ThemeToggleButtonComponent } from 'app/base/theme-toggle-button/theme-toggle-button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductsAdminComponent } from './product/products-admin/products-admin.component';
import { ProductsComponent } from './product/products/products.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ThemeToggleButtonComponent,
    BreadcrumbComponent,
    ProductsAdminComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [NavbarComponent, FooterComponent, SidenavComponent, BreadcrumbComponent]
})
export class BaseModule {}
