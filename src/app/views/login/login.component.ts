import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder, private server: ServicioService,private ruta:Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getdata(){
    console.log("Valores-->",this.formLogin.value);
    this.server.userLogin(this.formLogin.value).subscribe(
      res=>{
        console.log(res);
        if(res.ok){
          // this.cookieS.set('access',res.message,4,'/');
          // this.ruta.navigate(['/load',this.formLogin.get('user')?.value])
          if(res.rol==1){
            this.ruta.navigate(['/report'])
          }
          if(res.rol==2){
            this.ruta.navigate(['/load',this.formLogin.get('user')?.value])
          }
        }else{
          alert('Usuario o Contraseña Incorrecta');
        }
      }
    );
  }

}
