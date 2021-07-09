import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { upload } from '../models/upload';
import { response } from '../models/response';
import { reporte } from '../models/reportes';
import { valida } from '../models/asyncValidation';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {


  constructor(private http: HttpClient) { }

  test_Data() {
    return this.http.get(`${environment.URL_API}/mensaje`);
  }

  fileUpload(file: FormData) {
    file.forEach(eleme => {
      console.log("Seva al servidor", eleme);
    });
    return this.http.post<response>(`${environment.URL_API}/upload`, file);
  }

  userLogin(user: any) {
    console.log(user);
    return this.http.post<response>(`${environment.URL_API}/login`, user);
  }

  getRegis() {
    return this.http.get<reporte>(`${environment.URL_API}/reporte`);
  }
  /**
   * PAGINA REGISTROS
   */

  getDataFederacion() {
    return this.http.get(`${environment.URL_API}/muestra_federacion`);
  }

  addFederacion(federacion: any) {
    return this.http.post<valida>(`${environment.URL_API}/Insert/federacion`, federacion)
  }

  /**
   * Validaciones asincronas
   */
  asyncFederacion(provincia: string) {
    return this.http.get<valida>(`${environment.URL_API}/ASYNC/federacion/${provincia}`);
  }
  // ---------PROVINCIA--------------------
  getDataProvincia() {
    return this.http.get(`${environment.URL_API}/muestra_provincia`);
  }
  addProvincia(provincia: any) {
    return this.http.post<valida>(`${environment.URL_API}/Insert/provincia`, provincia)
  }


  // ----------DEPORTE---------------
  getDataDeporte() {
    return this.http.get(`${environment.URL_API}/muestra_deporte`);
  }

  /**
   * **************************
   */

}
