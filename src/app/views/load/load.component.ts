import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { ServicioService } from '../../service/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { registros } from '../../models/registros';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';   //Formulario
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx'; //Libreria (Previsualizacion)

type AOA = any[][];
@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css'],
})
export class LoadComponent implements OnInit {
  // @ViewChild('asWarning', { static: false }) asWarning!: ElementRef;
  // public formTouch!: FormGroup;
  public previsualizacion!: string;
  public archivos: any = [];
  public user: any;
  public loading!: boolean;
  public tabla_ver: boolean = false;
  public pdf_ver: boolean = false;
  public pdfSrc: string = '';
  public warning01: boolean = false;
  public warning02: boolean = false;
  public warning03: boolean = false;
  public warning04: boolean = false;
  public warning05: boolean = false;
  public warning06: boolean = false;
  public warning07: boolean = false;
  public warning08: boolean = false;
  public warning09: boolean = false;
  public warning10: boolean = false;
  // public alerta1: boolean = false;
  public mensajeWarningFederacion: string = 'Federacion dato erroneo';
  public mensajeWarningProvincia: string = 'Provincia dato erroneo';
  public mensajeWarningDeporte: string = 'Deporte dato erroneo';
  public mensajeWarningEtnia: string = 'Etnia dato erroneo';
  public mensajeWarningCategoriaEdad: string = 'Categoria Edad dato erroneo';
  public mensajeWarningDisciplina: string = 'Disciplina dato erroneo';
  public mensajeWarningCategoriaProyecto: string = 'Proyecto dato erroneo';
  public mensajeWarningPrueba: string = 'Prueba dato erroneo';
  public mensajeWarningSector: string = 'Sector dato erroneo';
  public mensajeWarningGenero: string = 'Genero dato erroneo';

  MENSAJE = '';
  /**
   * Validaciones
   */
  public dataFederacion: string[] = [];
  public dataProvincia: string[] = [];
  public dataDeporte: string[] = [];
  public dataEtnia: string[] = [];
  public dataDisciplina: string[] = [];
  public dataCategoriaEdad: string[] = [];
  public dataCategoriaProyecto: string[] = [];
  public dataPrueba: string[] = [];
  public dataSector: string[] = [];
  public dataGenero: string[] = [];
  /**
   * Previsualizacion
   */
  name = 'Angular';
  fileName: string = 'SheetJS.xlsx';
  data: any;
  headData: any; // excel row header

  constructor(
    private serve: ServicioService,
    // private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private ruta: ActivatedRoute,
    private rutas: Router // private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.serviciosTraerData();
    this.ruta.paramMap.subscribe((res) => {
      this.user = res.get('user');
      console.log('Usuario sistema->', this.user);
    });
  }

  serviciosTraerData() {
    this.serve.getDataFederacion().subscribe((res) => {
      res.map((m) => {
        this.dataFederacion.push(m.descripcion);
      });
    });
    this.serve.getDataProvincia().subscribe((res) => {
      res.map((m) => {
        this.dataProvincia.push(m.descripcion);
      });
    });
    this.serve.getDataDeporte().subscribe((res) => {
      res.map((m) => {
        this.dataDeporte.push(m.descripcion);
      });
    });
    this.serve.getDataEtnia().subscribe((res) => {
      res.map((m) => {
        this.dataEtnia.push(m.descripcion);
      });
    });
    this.serve.getDataDisciplina().subscribe((res) => {
      res.map((m) => {
        this.dataDisciplina.push(m.descripcion);
      });
    });
    this.serve.getDataCategoriaEdad().subscribe((res) => {
      res.map((m) => {
        this.dataCategoriaEdad.push(m.descripcion);
      });
    });
    this.serve.getDataCategoriaProyecto().subscribe((res) => {
      res.map((m) => {
        this.dataCategoriaProyecto.push(m.descripcion);
      });
    });
    this.serve.getDataPrueba().subscribe((res) => {
      res.map((m) => {
        this.dataPrueba.push(m.descripcion);
      });
    });
    this.serve.getDataSector().subscribe((res) => {
      res.map((m) => {
        this.dataSector.push(m.descripcion);
      });
    });
    this.serve.getDataGenero().subscribe((res) => {
      res.map((m) => {
        this.dataGenero.push(m.descripcion);
      });
    });
  }

  eliminarDiacriticosEs(texto: string) {
    return texto
      .normalize('NFD')
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        '$1'
      )
      .normalize();
  }
  onFileChange(evt: any) {
    // window.location.reload();
    this.tabla_ver = true;
    const archivoCapturado = evt.target.files[0];
    if (this.archivos.length > 0) {
      this.archivos.splice(0, 1);
    }
    // this.archivos.push(archivoCapturado)
    this.archivos.splice(0, 0, archivoCapturado);

    const target: DataTransfer = <DataTransfer>evt.target;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.data = <AOA>(
        XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, range: 0 })
      );
      this.headData = this.data[0];
      this.data = this.data.slice(1);
      console.log(this.data[0].length);
      let resta = 2;
      for (let i = 0; i < this.data.length; i++) {
        let pos = i + 1;
        console.log('I--->', i);
        // this.alerta1 = !this.dataCategoriaEdad.includes(this.data[i][5])
        //   ? ((this.mensajeWarningCategoriaEdad += `Fila:${pos} "${this.data[i][5]}", `),
        //     true)
        //   : false;
        // console.log('Alerta 1-->', this.alerta1);
        if (
          !this.dataGenero.includes(
            this.data[i][4 - resta].trim().toUpperCase()
          )
        ) {
          this.warning10 = true;
          this.mensajeWarningGenero += ` Fila:${pos} "${
            this.data[i][4 - resta]
          }", `;
        }
        if (
          !this.dataCategoriaEdad.includes(
            this.eliminarDiacriticosEs(
              this.data[i][5 - resta].trim().toUpperCase()
            )
          )
        ) {
          this.warning01 = true;
          this.mensajeWarningCategoriaEdad += ` Fila:${pos} "${
            this.data[i][5 - resta]
          }", `;
        }
        if (
          !this.dataProvincia.includes(
            this.eliminarDiacriticosEs(
              this.data[i][8 - resta].trim().toUpperCase()
            )
          )
        ) {
          this.warning02 = true;
          this.mensajeWarningProvincia += ` Fila:${pos} "${
            this.data[i][8 - resta]
          }", `;
        }
        if (
          !this.dataCategoriaProyecto.includes(
            this.eliminarDiacriticosEs(
              this.data[i][9 - resta].trim().toUpperCase()
            )
          )
        ) {
          this.warning03 = true;
          this.mensajeWarningCategoriaProyecto += ` Fila:${pos} "${
            this.data[i][9 - resta]
          }", `;
        }
        if (
          !this.dataEtnia.includes(
            this.eliminarDiacriticosEs(
              this.data[i][13 - resta].trim().toUpperCase()
            )
          )
        ) {
          this.warning04 = true;
          this.mensajeWarningEtnia += ` Fila:${pos} "${
            this.data[i][13 - resta]
          }", `;
        }
        if (
          !this.dataSector.includes(
            this.eliminarDiacriticosEs(
              this.data[i][14 - resta].trim().toUpperCase()
            )
          )
        ) {
          this.warning05 = true;
          this.mensajeWarningSector += ` Fila:${pos} "${
            this.data[i][14 - resta]
          }", `;
        }
        if (
          !this.dataFederacion.includes(
            this.eliminarDiacriticosEs(
              this.data[i][17 - resta].trim().toUpperCase()
            )
          )
        ) {
          this.warning06 = true;
          this.mensajeWarningFederacion += ` Fila:${pos} "${
            this.data[i][17 - resta]
          }", `;
        }
        if (
          !this.dataDeporte.includes(
            this.eliminarDiacriticosEs(
              this.data[i][18 - resta].trim().toUpperCase()
            )
          )
        ) {
          this.warning07 = true;
          this.mensajeWarningDeporte += ` Fila:${pos} "${
            this.data[i][18 - resta]
          }", `;
        }
        if (
          !this.dataDisciplina.includes(
            this.eliminarDiacriticosEs(
              this.data[i][19 - resta].trim().toUpperCase()
            )
          )
        ) {
          this.warning08 = true;
          this.mensajeWarningDisciplina += ` Fila:${pos} "${
            this.data[i][19 - resta]
          }", `;
        }
        // console.log(this.data[i][23 - resta]);
        // if ((this.data[i][20] = 'SUNFISH SNIPE (MIX)')) {
        //   // console.log('Original leido-> ', this.data[i][20]);
        //   // console.log('BDD-> ', this.dataPrueba);
        //   // console.log(
        //   //   !this.dataPrueba.includes(
        //   //     this.eliminarDiacriticosEs(this.data[i][20].trim())
        //   //   )
        //   // );
        // }

        if (
          !this.dataPrueba.includes(
            this.eliminarDiacriticosEs(
              this.data[i][23 - 5].trim().toUpperCase()
            )
          )
        ) {
          this.warning09 = true;
          this.mensajeWarningPrueba += ` Fila:${pos} "${
            this.data[i][23 - 5]
          }", `;
        }

        // console.log(this.mensajeWarning);
      }
      // console.log(this.mensajeWarningCategoriaEdad);
      console.log(this.mensajeWarningPrueba);
      // this.MENSAJE = this.mensajeWarningCategoriaEdad;
    };
    reader.readAsBinaryString(target.files[0]);
    // this.data.splice(0,this.data.length)
    // this.rutas.
  }

  capturaPDF(event: any) {
    this.pdf_ver = true;
    const archivoCapturado = event.target.files[0];
    if (this.archivos.length > 1) {
      this.archivos.splice(1, 1);
    }
    // this.archivos.push(archivoCapturado);
    this.archivos.splice(1, 0, archivoCapturado);
    let reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.pdfSrc = e.target.result;
    };
    reader.readAsArrayBuffer(archivoCapturado);
  }

  subirArchivo() {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        // console.log("Files", archivo);
        formularioDeDatos.append('files', archivo);
      });
      formularioDeDatos.append('user', this.user);
      this.serve.fileUpload(formularioDeDatos).subscribe((ser) => {
        this.loading = false;
        console.log('RESPUESTA S->', ser);
        console.log(ser.message);
        if (ser.ok) {
          alert(ser.message);
        } else {
          alert(ser.message);
        }
        window.location.reload();
      });
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);
    }
  }

  descargarExcel() {
    const excelpath = '../../../assets/documentos/Formato.xlsx';
    // const excelNombre = 'Formato.xlsx';
    const tipoDato = 'application/vnd.ms-excel';
    const binario = excelpath;
    let req = new XMLHttpRequest();
    // let data;
    req.open('GET', excelpath, true);
    req.responseType = 'arraybuffer';
    req.onload = (e) => {
      const bstr = e.target;
      console.log('E->', e);

      let data = new Uint8Array(req.response);

      // TO export the Excel file
      // this.saveAsExcelFile(excelBuffer, 'X');
      const filepath = window.URL.createObjectURL(
        new Blob([data], { type: 'application/vnd.ms-excel' })
      );
      const dowloadLink = document.createElement('a');
      dowloadLink.href = filepath;
      dowloadLink.setAttribute('dowload', 'Formato.xlsx');
      document.body.appendChild(dowloadLink);
      dowloadLink.click();
    };

    req.send();
  }

  descargarExcel2(): void {
    console.log('En el metodo para descagar');
    const filename = 'Formato.xlsx';
    this.serve.getFormato().subscribe((response) => {
      // console.log('Data response archivo');
      console.log(response);
      // this.adminExcel(response,excelNombre);
      const url = window.URL.createObjectURL(
        new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
      ); // <-- work with blob directly
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = filename;
      a.click();
    });
  }

}
