import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { SalesComponent } from './sales/sales.component';
import { OrdersTableComponent } from './orders/orders-table/orders-table.component';

const routes: Routes = [
  { path: 'dashboard', component: DashComponent },
  { path: 'sales', component: SalesComponent }
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
