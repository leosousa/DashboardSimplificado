import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { mergeMap } from 'rxjs/operators';
import { Observable, merge, of } from 'rxjs';
import { Sale } from '../sale';
import { SalesService } from '../sales.service';

/**
 * Data source for the OrdersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SalesTableDataSource extends DataSource<Sale> {
    paginator: MatPaginator;
    sort: MatSort;
  
    constructor(private salesService: SalesService) {
      super();
    }
  
    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Sale[]> {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      const dataMutations = [
        of('Initial load'),
        this.paginator.page,
        this.sort.sortChange
      ];
  
      return merge(...dataMutations).pipe(mergeMap(() => {
        return this.salesService.getSales(
          this.paginator.pageIndex * this.paginator.pageSize,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction
          );
      }));
    }
  
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {}
}
