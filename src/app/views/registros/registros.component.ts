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

  public formFormulario!: FormGroup;

  public dataFederacion: registros[] = [];
  public dataProvincia: registros[] = [];
  public dataDeporte: registros[] = [];
  public dataEtnia: registros[] = [];
  public dataDisciplina: registros[] = [];
  public dataCategoriaEdad: registros[] = [];
  public dataCategoriaProyecto: registros[] = [];
  public dataPrueba: registros[] = [];
  public dataSector: registros[] = [];
  public dataGenero: registros[] = [];

  ngOnInit(): void {
    this.serviciosTraerData();
    this.formulariosInstancias();
  }

  serviciosTraerData() {
    this.serve.getDataFederacion().subscribe((res) => {
      this.dataFederacion = res;
    });
    this.serve.getDataProvincia().subscribe((res) => {
      this.dataProvincia = res;
    });
    this.serve.getDataDeporte().subscribe((res) => {
      this.dataDeporte = res;
    });
    this.serve.getDataEtnia().subscribe((res) => {
      this.dataEtnia = res;
    });
    this.serve.getDataDisciplina().subscribe((res) => {
      this.dataDisciplina = res;
    });
    this.serve.getDataCategoriaEdad().subscribe((res) => {
      this.dataCategoriaEdad = res;
    });
    this.serve.getDataCategoriaProyecto().subscribe((res) => {
      this.dataCategoriaProyecto = res;
    });
    this.serve.getDataPrueba().subscribe((res) => {
      this.dataPrueba = res;
    });
    this.serve.getDataSector().subscribe((res) => {
      this.dataSector = res;
    });
    this.serve.getDataGenero().subscribe((res) => {
      this.dataGenero = res;
    });
  }

  formulariosInstancias() {
    this.formFormulario = this.formBuilder.group({
      Dato: [
        '',
        Validators.required,
        // MyValidations.validaFederacion(this.serve),
      ],
    });
    // this.formProvincia = this.formBuilder.group({
    //   provincia: ['', Validators.required],
    // });
  }

  /**
   * Submits
   */
  insertaFederacion() {
    // console.log('Federacion del form->', this.formFormulario.value);
    this.serve.addFederacion(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }

  insertaProvincia() {
    this.serve.addProvincia(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
  insertaDeporte() {
    this.serve.addDeporte(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
  insertaDisciplina() {
    this.serve.addDisciplina(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
  insertaPrueba() {
    this.serve.addPrueba(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
  insertaCategoria_proyecto() {
    this.serve
      .addCategoria_proyecto(this.formFormulario.value)
      .subscribe((res) => {
        console.log(res);
        if (res.ok) {
          alert(res.message);
        }
      });
  }
  insertaCategoria_edad() {
    this.serve.addCategoria_edad(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
  insertaEtnia() {
    this.serve.addEtnia(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
  insertaSector() {
    this.serve.addSector(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
  insertaGenero() {
    this.serve.addGenero(this.formFormulario.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        alert(res.message);
      }
    });
  }
}

