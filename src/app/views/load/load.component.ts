import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';   //Formulario
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx';   //Libreria (Previsualizacion)

type AOA = any[][];

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  // public formTouch!: FormGroup;
  public previsualizacion!: string;
  public archivos: any = [];
  public user: any;
  public loading!: boolean;
  public tabla_ver: boolean = false;
  /**
   * Previsualizacion
   */
  name = 'Angular';
  fileName: string = 'SheetJS.xlsx';
  data: any;
  headData: any // excel row header

  constructor(private server: ServicioService,
    // private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private ruta: ActivatedRoute,
    private rutas: Router) { }


  ngOnInit(): void {
    this.ruta.paramMap.subscribe(res => {
      this.user = res.get("user");
      console.log("Usuario sistema->", this.user);
    })

  }
  onFileChange(evt: any) {
    this.tabla_ver = true;
    const archivoCapturado = evt.target.files[0]
    if (this.archivos.length > 0) {
      this.archivos.splice(0, 1);
    }
    // this.archivos.push(archivoCapturado)
    this.archivos.splice(0, 0, archivoCapturado);
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    // if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      // console.log(".onread->",e);
      const bstr: string = e.target.result;
      // console.log("---\n","bstr",bstr);
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      // console.log("---");
      // console.log("WB->",wb);
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, range: 3 }));
      console.log(this.data[0]);

      this.headData = this.data[0];
      this.data = this.data.slice(1); // remove first header record

      const ws2: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];
      // this.readDataSheet(ws2, 3);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  capturaPDF(event: any) {
    const archivoCapturado = event.target.files[0]
    if (this.archivos.length > 1) {
      this.archivos.splice(1, 1);
    }
    // this.archivos.push(archivoCapturado);
    this.archivos.splice(1, 0, archivoCapturado);
  }

  subirArchivo() {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        // console.log("Files", archivo);
        formularioDeDatos.append('files', archivo)
      });
      formularioDeDatos.append('user', this.user);
      this.server.fileUpload(formularioDeDatos)
        .subscribe((ser) => {
          this.loading = false;
          console.log("RESPUESTA S->", ser);
          console.log(ser.message);
          if (ser.ok) {
            alert(ser.message);
          } else {
            alert(ser.message);
          }
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
    req.responseType = "arraybuffer";
    req.onload = (e) => {
      const bstr = e.target
      console.log("E->", e);

      let data = new Uint8Array(req.response);


      // TO export the Excel file
      // this.saveAsExcelFile(excelBuffer, 'X');
      const filepath = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }));
      const dowloadLink = document.createElement('a');
      dowloadLink.href = filepath;
      dowloadLink.setAttribute('dowload', 'Formato.xlsx');
      document.body.appendChild(dowloadLink);
      dowloadLink.click();

    };

    req.send();


  }

}