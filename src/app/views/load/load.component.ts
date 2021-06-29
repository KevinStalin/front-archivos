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
  public user:any;
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
  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })
    this.archivos.push(archivoCapturado)
    // 
    // console.log(event.target.files);

  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  });
  subirArchivo(){
    try {
      // this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        console.log("Files",archivo);
        formularioDeDatos.append('files', archivo)
      });
      formularioDeDatos.append('_user',this.user);
      console.log("FORM_DATA>>>",formularioDeDatos);
      this.server.fileUpload(formularioDeDatos).subscribe((res)=>{
        console.log("RESPUESTA",res); 
      })  
      // this.rest.post(`http://localhost:3001/upload`, formularioDeDatos)
      //   .subscribe(res => {
      //     // this.loading = false;
      //     console.log('Respuesta del servidor', res);

      //   }, () => {
      //     // this.loading = false;
      //     alert('Error');
      //   })
    } catch (e) {
      // this.loading = false;
      console.log('ERROR', e);

    }
  }
  /**
   * Previsualizar xlsx
   */

  onFileChange(evt: any) {
    const archivoCapturado = evt.target.files[0]
    this.archivos.push(archivoCapturado)
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

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

}
