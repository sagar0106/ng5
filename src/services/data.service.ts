import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { environment } from '../environments/environment';

@Injectable()
export class DataService {

  options: RequestOptions;
  constructor(
    private http: Http) {
    const headers = new Headers();
    const token = JSON.parse(localStorage.getItem('token'));
    headers.append('x-access-token', token);
    headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers });
  }

  url = `${environment.apiUrl}`;

  getAll(apiKey, query?) {
   // let dataQuery;
    this.bindTokenInHeader();
   // dataQuery = JSON.stringify(query);
   //   return this.http.get(`${this.url}/?dataQuery=${encodeURIComponent(dataQuery)}`, this.options)
   return this.http.get(`${this.url}/${apiKey}`, this.options)
        .map(response => response.json())
        .catch(this.handleError);
  }

  getById(apiKey, id) {
    this.bindTokenInHeader();
    return this.http.get(`${this.url}/${apiKey}/${id}`, this.options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(apiKey, resource) {
    this.bindTokenInHeader();
      return this.http.post(`${this.url}/${apiKey}`, JSON.stringify(resource),   this.options)
      .map(response => response)
      .catch(this.handleError);
  }

  update(apiKey, resource) {
    this.bindTokenInHeader();
    return this.http.patch(`${this.url}/${apiKey}/${resource._id}`, JSON.stringify(resource), this.options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  updateJoin(apiKey, id, resource) {
    this.bindTokenInHeader();
    return this.http.patch(`${this.url}/${apiKey}/${id}`, JSON.stringify(resource), this.options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  delete(apiKey, id) {
    this.bindTokenInHeader();
    return this.http.delete(`${this.url}/${apiKey}/${id}`, this.options)
      .map(response => response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    return Observable.throw(new Error(error.toString()));
  }

  bindTokenInHeader() {
    const headers = new Headers();
    const token = JSON.parse(localStorage.getItem('token'));
    headers.append('x-access-token', token);
    headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: headers });
  }
}
