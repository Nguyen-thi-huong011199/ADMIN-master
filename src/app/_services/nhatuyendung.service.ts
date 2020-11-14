import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

 const baseUrl = environment.apiUrl + "Nhatuyendungs/";

 @Injectable({
  providedIn: 'root'
 })

 export class NhatuyendungService {
    constructor(
     private _http: HttpClient
     ) { }

     getAll() {
        return this._http
            .get<any>(baseUrl, { headers: environment.headerOptions });
    }

    getPagination(page, pageSize) {
        let params = new HttpParams()
        .set('page', page)
        .set('pageSize', pageSize);
        
        return this._http
            .get<any>(baseUrl + "pagination", { headers: environment.headerOptions, params: params });
    }

    create(data) {
        return this._http
            .post(baseUrl, data);
    }

    update(id, data) {
        return this._http
            .put(baseUrl + id, data);
    }

    delete(id) {
        return this._http
            .delete(baseUrl + id);
    }
}