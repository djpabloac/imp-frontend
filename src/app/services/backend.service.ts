import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseApi  } from 'src/types/response.type';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private configUrl: string = '';

  constructor(private http: HttpClient) {
    this.configUrl = `${environment.backendUrl}/api/v1/product`;
  }

  getProducts(search: string): Observable<ResponseApi> {
    const url = `${this.configUrl}/alls/${search}`;
    const responseApi = this.http.get<ResponseApi>(url);
    return responseApi;
  }

  getProductById(ID: string): Observable<ResponseApi> {
    const url = `${this.configUrl}/${ID}`;
    const responseApi = this.http.get<ResponseApi>(url);
    return responseApi;
  }

  getCategories(): Observable<ResponseApi> {
    const url = `${this.configUrl}/bycategory`;
    const responseApi = this.http.get<ResponseApi>(url);
    return responseApi;
  }

  getStatus(): Observable<ResponseApi> {
    const url = `${this.configUrl}/bystatus`;
    const responseApi = this.http.get<ResponseApi>(url);
    return responseApi;
  }

}
