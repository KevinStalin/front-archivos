import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { upload } from '../models/upload';
import { response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {


  constructor(private http: HttpClient) { }

  test_Data() {
    return this.http.get(`${environment.URL_API}/mensaje`);
  }

  fileUpload(file:JSON){
    console.log(file);
    return this.http.post<response>(`${environment.URL_API}/upload`,file);
  }

  userLogin(user:any){
    console.log(user);
    return this.http.post<response>(`${environment.URL_API}/login`,user);
  }

  getRegis(){
    return this.http.get(`${environment.URL_API}/mostrar2`);
  }

}
