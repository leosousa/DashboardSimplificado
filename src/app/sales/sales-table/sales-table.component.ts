import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Sale } from '../sale';
import { SalesService } from '../sales.service';
import { SalesTableDataSource } from './sales-table-datasource';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Sale>;
  dataSource: SalesTableDataSource;
  dataLength: number;
  errorMessage: string;

  displayedColumns = [
    "id",
    "date",
    "customer",
    "product",
    "price",
  ];

  constructor(private salesService: SalesService){}

  ngOnInit() {
    this.dataSource = new SalesTableDataSource(this.salesService);
    this.salesService.getOrderCount().subscribe({
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
