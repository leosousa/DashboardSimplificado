import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'api/customers/customers.json';
  
  constructor(private http: HttpClient) { }

  getSales(offset?: number, pageSize?: number, sortField?: string, sortDirection?: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl).pipe(
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

  private getPagedData(data: Customer[], startIndex: number, pageSize: number) {
    return data.splice(startIndex, pageSize);
  }

  private getSortedData(data: Customer[], active: string, direction: string) {
    if (!active || direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = direction === 'asc';
      switch (active) {
        case "id": return compare(+a.id, +b.id, isAsc);
        case "date": return compare(+a.date, +b.date, isAsc);
        case "name": return compare(+a.name, +b.name, isAsc);
        default: return 0;
      }
    });
  }

  getOrderCount(): Observable<number> {
    return this.http.get<Customer[]>(this.customersUrl).pipe(
      map((response) => {
        return response.length;
      }),
      catchError(this.handleError)
    );
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
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
