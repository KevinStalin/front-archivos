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

  constructor(private serve: ServicioService) {}

  ngOnInit(): void {
    this.serve.getRegis().subscribe((res) => {
      console.log(res);
      this.reportes = res;
    });
  }

  descargarExcel(nombrearchivo: string) {
    console.log('Nombre Archivo Lista-> ', nombrearchivo);
    this.serve.getExcel(nombrearchivo).subscribe((response) => {
      console.log('Data response archivo');
      console.log(response);
      // this.adminExcel(response,excelNombre);
      const url = window.URL.createObjectURL(
        new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
      );
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = nombrearchivo;
      a.click();
    });
  }
  descargarPDF(nombrearchivo: string) {
    console.log('Nombre Archivo Lista-> ', nombrearchivo);
    this.serve.getPDF(nombrearchivo).subscribe((response) => {
      console.log('Data response archivo');
      console.log(response);
      // this.adminExcel(response,excelNombre);
      const url = window.URL.createObjectURL(
        new Blob([response], {
          type: 'application/pdf',
        })
      );
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = nombrearchivo;
      a.click();
    });
  }
}
