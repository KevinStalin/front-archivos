import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidations } from '../../utils/validaciones';
import { registros } from '../../models/registros';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit {
  constructor(
    private serve: ServicioService,
    private formBuilder: FormBuilder
  ) {}

  public formFederacion!: FormGroup;
  public formProvincia!: FormGroup;

  public dataFederacion: registros[]=[];
  public dataProvincia: any = [];
  public dataDeporte: any = [];

  ngOnInit(): void {
    this.serviciosTraerData();
    this.formulariosInstancias();
  }

  serviciosTraerData() {
    /**
     * Datos de: Federacion Ecuatoriana
     */
    this.serve.getDataFederacion().subscribe((res) => {
      this.dataFederacion = res;
    });
    /**
     * Datos de:
     */
    this.serve.getDataProvincia().subscribe((res) => {
      this.dataProvincia = res;
    });

    this.serve.getDataDeporte().subscribe((res) => {
      this.dataDeporte = res;
    });
  }

  formulariosInstancias() {
    this.formFederacion = this.formBuilder.group({
      federacion: [
        '',
        Validators.required,
        MyValidations.validaFederacion(this.serve),
      ], //MyValidations.validaFederacion(this.serve)
    });
    this.formProvincia = this.formBuilder.group({
      provincia: ['', Validators.required],
    });
  }

  /**
   * Submits
   */

  insertaFederacion() {
    this.serve.addFederacion(this.formFederacion.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }

  insertaProvincia() {
    console.log(this.formProvincia.value);
    this.serve.addProvincia(this.formProvincia.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
}
