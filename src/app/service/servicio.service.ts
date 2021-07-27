import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { upload } from '../models/upload';
import { response } from '../models/response';
import { reporte } from '../models/reportes';
import { valida } from '../models/asyncValidation';
import { Observable } from 'rxjs';
import { registros } from '../models/registros';
@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private http: HttpClient) {}

  test_Data() {
    return this.http.get(`${environment.URL_API}/mensaje`);
  }

  fileUpload(file: FormData) {
    file.forEach((eleme) => {
      console.log('Seva al servidor', eleme);
    });
    return this.http.post<response>(`${environment.URL_API}/upload`, file);
  }

  userLogin(user: any) {
    console.log(user);
    return this.http.post<response>(`${environment.URL_API}/login`, user);
  }

  getRegis(): Observable<reporte[]> {
    return this.http.get<reporte[]>(`${environment.URL_API}/reporte`);
  }
  /**
   * PAGINA REGISTROS CONSULTAS
   */

  getDataFederacion(): Observable<registros[]> {
    return this.http.get<registros[]>(
      `${environment.URL_API}/muestra_federacion`
    );
  }
  getDataProvincia(): Observable<registros[]> {
    return this.http.get<registros[]>(
      `${environment.URL_API}/muestra_provincia`
    );
  }
  getDataDeporte(): Observable<registros[]> {
    return this.http.get<registros[]>(`${environment.URL_API}/muestra_deporte`);
  }
  getDataEtnia(): Observable<registros[]> {
    return this.http.get<registros[]>(`${environment.URL_API}/muestra_etnia`);
  }
  getDataDisciplina(): Observable<registros[]> {
    return this.http.get<registros[]>(
      `${environment.URL_API}/muestra_disciplina`
    );
  }
  getDataCategoriaEdad(): Observable<registros[]> {
    return this.http.get<registros[]>(
      `${environment.URL_API}/muestra_categoria_edad`
    );
  }
  getDataCategoriaProyecto(): Observable<registros[]> {
    return this.http.get<registros[]>(
      `${environment.URL_API}/muestra_categoria_proyecto`
    );
  }
  getDataPrueba(): Observable<registros[]> {
    return this.http.get<registros[]>(`${environment.URL_API}/muestra_prueba`);
  }
  getDataSector(): Observable<registros[]> {
    return this.http.get<registros[]>(`${environment.URL_API}/muestra_sector`);
  }
  getDataGenero(): Observable<registros[]> {
    return this.http.get<registros[]>(`${environment.URL_API}/muestra_genero`);
  }

  /**
   * PAGINA REGISTROS AGREGA (INSERT BDD)
   */

  addFederacion(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/federacion`,
      valor
    );
  }
  addProvincia(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/provincia`,
      valor
    );
  }
  addDeporte(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/deporte`,
      valor
    );
  }
  addDisciplina(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/disciplina`,
      valor
    );
  }
  addPrueba(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/prueba`,
      valor
    );
  }
  addCategoria_proyecto(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/categoria_proyecto`,
      valor
    );
  }
  addCategoria_edad(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/categoria_edad`,
      valor
    );
  }
  addEtnia(valor: any) {
    return this.http.post<valida>(`${environment.URL_API}/Insert/etnia`, valor);
  }
  addSector(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/sector`,
      valor
    );
  }
  addGenero(valor: any) {
    return this.http.post<valida>(
      `${environment.URL_API}/Insert/genero`,
      valor
    );
  }

  /**
   * Validaciones asincronas
   */
  check_federacion(provincia: string) {
    return this.http.get<valida>(
      `${environment.URL_API}/ASYNC/federacion/${provincia}`
    );
  }
}
