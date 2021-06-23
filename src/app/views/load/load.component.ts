import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';   //Formulario
@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  public formTouch!: FormGroup;

  constructor(private server: ServicioService, private formBuilder: FormBuilder, private ruta: ActivatedRoute, private rutas: Router) { }

  ngOnInit(): void {
    this.ruta.paramMap.subscribe(res => {
      const user = res.get("user");
      console.log("Usuario sistema->", user);
    })

    // this.formTouch = this.formBuilder.group({
    //   xslx: ['', [Validators.required]],
    //   pdf: ['', [Validators.required]]
    // });
  }
/*
  getTouch() {
    console.log("Valores Form");
    console.log(this.formTouch.get('xslx')?.value);
    console.log(this.formTouch.get('pdf')?.value);
    this.server.fileUpload(this.formTouch.value).subscribe(res => {
      console.log("Respuesta:");
      console.log(res);
    })
  }
*/
  capturafile(event: any) {
    // const archivoCapturado = event.ta
    console.log(event.target.files);
  }

}
