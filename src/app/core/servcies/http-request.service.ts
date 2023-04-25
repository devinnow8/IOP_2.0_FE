import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  public get(url: string, options?: any) {
    return this.http.get<HttpClient>(environment.BASE_API_URL + url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post<HttpClient>(environment.BASE_API_URL + url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put<HttpClient>(environment.BASE_API_URL + url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete<HttpClient>(environment.BASE_API_URL + url, options);
  }

  /******************** HTTP Params ********************/
  appendParams(myParams: { [x: string]: any; }): HttpParams {
    let params = new HttpParams();
    for (let key in myParams) {
      params = params.append(key, myParams[key]);
    }
    return params;
  }

}