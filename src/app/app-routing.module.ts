import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';
import { SalesTableComponent } from './sales/sales-table/sales-table.component';
import { CustomersTableComponent } from './customers/customers-table/customers-table.component';
import { ProductTableComponent } from './products/product-table/product-table.component';

const routes: Routes = [
  { path: '', component: DashComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'vendas', component: SalesTableComponent },
  { path: 'pedidos', component: OrdersTableComponent },
  { path: 'clientes', component: CustomersTableComponent },
  { path: 'produtos', component: ProductTableComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
