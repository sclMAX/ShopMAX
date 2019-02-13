import {FormBuilder} from '@angular/forms';
import {ClienteInterface} from 'src/app/models/Cliente';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-am-cliente',
  templateUrl: './am-cliente.component.html',
  styleUrls: ['./am-cliente.component.scss']
})
export class AmClienteComponent implements OnInit {
  @Input() cliente: ClienteInterface = {} as ClienteInterface;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
