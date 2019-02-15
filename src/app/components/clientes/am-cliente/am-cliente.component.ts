import {LoadingController} from '@ionic/angular';
import {ClienteService} from './../../../services/cliente.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import {ClienteInterface} from 'src/app/models/Cliente';
import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription, Observable, of} from 'rxjs';

@Component({
  selector: 'am-cliente',
  templateUrl: './am-cliente.component.html',
  styleUrls: ['./am-cliente.component.scss']
})
export class AmClienteComponent implements OnInit,
    OnDestroy {
  @Input() id_cliente: string;
  cliente: ClienteInterface;
  form: FormGroup;
  isEdit = false;
  private sub: Subscription;
  constructor(private fb: FormBuilder, private clienteS: ClienteService,
              private loadCtrl: LoadingController, private router: Router) {}

  ngOnInit() {
    this.crearForm();
    if (this.id_cliente) {
      this.isEdit = true;
      this.sub = this.clienteS.getOne(this.id_cliente)
                     .subscribe(data => {
                       this.cliente = data;
                       this.form.patchValue(this.cliente);
                     });
    } else {
      this.cliente = {} as ClienteInterface;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async onSubmit() {
    const load = await this.loadCtrl.create({message: 'Guardando cliente...'});
    await load.present();
    try {
      Object.assign(this.cliente, this.form.value);
      await this.clienteS.update(this.cliente);
      return await this.router.navigate(['clientes', 'list']);
    } catch (e) {
      console.log(e);
    } finally {
      load.dismiss();
    }
  }

  private crearForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required], [this.validateUnique()]],
      dni: [0, [Validators.required, Validators.maxLength(8)]],
      email: ['', [Validators.email]],
      direccion: [''],
      telefono_movil: [''],
      telefono_fijo: [''],
      limite_credito: [0, [Validators.required]],
      comentarios: ['']
    });
  }

  private validateUnique(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null>|
               Observable<ValidationErrors | null> => {
      if (this.isEdit && (this.cliente && this.cliente.nombre)) {
        if (this.cliente.nombre.toLowerCase() ===
            String(this.form.controls['nombre'].value).toLowerCase()) {
          return of(null);
        }
      }
      return this.clienteS.isUnique(control.value)
          .then(res => (res) ? null : {'notUnique': true});
    };
  }
}
