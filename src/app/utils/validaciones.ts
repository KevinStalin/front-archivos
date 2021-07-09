import { AbstractControl } from '@angular/forms';
import { ServicioService } from '../service/servicio.service';
import { map } from 'rxjs/operators';

export class MyValidations{

    static validaFederacion(apiServ: ServicioService) {
        return (control: AbstractControl) => {
            return apiServ.asyncFederacion(control.value)
                .pipe(
                    map(res => {
                        console.log(res);
                        return res.ok ? null : { ok: true };
                    })
                )
        }
    }




}
