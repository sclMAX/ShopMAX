import { ClienteService } from './../../../services/cliente.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors, FormArray } from '@angular/forms';
import { ClienteInterface } from 'src/app/models/Cliente';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'am-cliente',
  templateUrl: './am-cliente.component.html',
  styleUrls: ['./am-cliente.component.scss']
})
export class AmClienteComponent implements OnInit {
  @Input() cliente: ClienteInterface = {} as ClienteInterface;
  form: FormGroup;
  isEdit = false;
  constructor(private fb: FormBuilder, private clienteS: ClienteService) { }

  ngOnInit() {
    this.crearForm();
  }

  async onSubmit() {
    try {
      console.log(this.cliente);
      console.log(this.form.value);
      Object.assign(this.cliente, this.form.value);
      console.log(this.cliente);
      return await this.clienteS.update(this.cliente);
    } catch (e) {
      console.log(e);
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
    if (this.cliente) {
      this.isEdit = true;
      this.form.patchValue(this.cliente);
    } else {
      this.cliente = {} as ClienteInterface;
    }
  }

  private validateUnique(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (this.isEdit && (this.cliente && this.cliente.nombre)) {
        if (this.cliente.nombre.toLowerCase() === String(this.form.controls['nombre'].value).toLowerCase()) {
          return null;
        }
      }
      return this.clienteS.isUnique(control.value).then(res => (res) ? null : { 'notUnique': true });
    };
  }
}
