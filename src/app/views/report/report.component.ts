import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service';
import { reporte } from '../../models/reportes';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  public reportes: reporte[] = [];

  constructor(private service: ServicioService) {}

  ngOnInit(): void {
    this.service.getRegis().subscribe((res) => {
      console.log(res);
      this.reportes = res;
    });
  }

  descargarExcel(nombrearchivo: any) {
    console.log('Nombre Archivo Lista-> ', nombrearchivo);
    const genralPath =
      '/home/kevin/M_Deportes/Archivos/Back_archivos/src/routes/uploads/' +
      nombrearchivo;
    const excelpath = '../../../assets/documentos/Formato.xlsx';
    // const excelNombre = 'Formato.xlsx';
    const tipoDato = 'application/vnd.ms-excel';
    const binario = excelpath;
    let req = new XMLHttpRequest();
    // let data;
    console.log('Path GENERAL_>', genralPath);
    req.open('GET', genralPath, true);
    req.responseType = 'arraybuffer';
    req.onload = (e) => {
      const bstr = e.target;
      console.log('E->', e);

      let data = new Uint8Array(req.response);
      console.log('Data->Fun', data);

      // TO export the Excel file
      // this.saveAsExcelFile(excelBuffer, 'X');

      const filepath = window.URL.createObjectURL(
        new Blob([data], { type: 'application/vnd.ms-excel' })
      );
      const dowloadLink = document.createElement('a');
      dowloadLink.href = filepath;
      dowloadLink.setAttribute('dowload', nombrearchivo);
      document.body.appendChild(dowloadLink);
      dowloadLink.click();
    };

    req.send();
  }
}
