import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MonthlySales } from './montly-sales';
import { Sale } from './sale';

@Injectable({
  providedIn: 'root'
})

export class SalesService {
  private salesUrl = 'api/sales/sales.json';
  private lastSaleItemsUrl = 'api/sales/last-sales.json';

  constructor(private http: HttpClient) { }

  getSalesByMonth(): Observable<MonthlySales[]>{
    return this.http.get<MonthlySales[]>(this.salesUrl).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `Ocorreu um erro: ${err.error.message}`;
    } else {
      errorMessage = `O servidor retornou um código de erro: ${err.status}, mensagem do erro é: ${err.message}`; 
    }

    return throwError(errorMessage);
  }

  
  getSales(offset?: number, pageSize?: number, sortField?: string, sortDirection?: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.lastSaleItemsUrl).pipe(
      map((response) => {
        return this.getPagedData(
          this.getSortedData(
            response,
            sortField,
            sortDirection),
          offset, pageSize);
      }),
      catchError(this.handleError)
    );
  }

  private getPagedData(data: Sale[], startIndex: number, pageSize: number) {
    return data.splice(startIndex, pageSize);
  }

  private getSortedData(data: Sale[], active: string, direction: string) {
    if (!active || direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = direction === 'asc';
      switch (active) {
        case "id": return compare(+a.id, +b.id, isAsc);
        case "date": return compare(+a.date, +b.date, isAsc);
        case "customer": return compare(+a.customer, +b.customer, isAsc);
        case "product": return compare(+a.product, +b.product, isAsc);
        case "price": return compare(+a.price, +b.price, isAsc);
        default: return 0;
      }
    });
  }

  getLastSaleItems(): Observable<Sale[]>{
    return this.http.get<Sale[]>(this.lastSaleItemsUrl).pipe(catchError(this.handleError));
  }

  getOrderCount(): Observable<number> {
    return this.http.get<Sale[]>(this.lastSaleItemsUrl).pipe(
      map((response) => {
        return response.length;
      }),
      catchError(this.handleError)
    );
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
