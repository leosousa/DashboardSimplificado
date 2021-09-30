import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { CustomerTableDataSource } from './customer-table-datasource';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Customer>;
  dataSource: CustomerTableDataSource;
  dataLength: number;
  errorMessage: string;

  displayedColumns = [
    "id",
    "date",
    "name",
  ];

  constructor(private customerService: CustomerService){}

  ngOnInit() {
    this.dataSource = new CustomerTableDataSource(this.customerService);
    this.customerService.getOrderCount().subscribe({
      next: orderCount => {
        this.dataLength = orderCount;
      },
      error: err => this.errorMessage = err
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}