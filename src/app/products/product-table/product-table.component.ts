import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductTableDataSource } from './product-table-datasource';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: ProductTableDataSource;
  dataLength: number;
  errorMessage: string;

  displayedColumns = [
    "id",
    "name",
    "quantity",
  ];

  constructor(private productService: ProductService){}

  ngOnInit() {
    this.dataSource = new ProductTableDataSource(this.productService);
    this.productService.getOrderCount().subscribe({
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