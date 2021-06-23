import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private service:ServicioService) { }

  ngOnInit(): void {
    this.service.getRegis().subscribe(
      res=>{
        console.log(res);
    });
  }

}
