import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { LoadComponent } from './views/load/load.component';
import { ReportComponent } from './views/report/report.component';
import { RegistrosComponent } from './views/registros/registros.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'load/:user',
    component:LoadComponent
  },
  {
    path:'report',
    component:ReportComponent
  },
  {
    path:'registros',
    component:RegistrosComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  LoginComponent,
  LoadComponent,
  ReportComponent,
  RegistrosComponent
]