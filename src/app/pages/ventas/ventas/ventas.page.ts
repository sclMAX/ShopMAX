import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/lib/mercadopago/services/payment.service';
import { Observable, from } from 'rxjs';
import { PaymentMethodInterface } from 'src/app/lib/mercadopago/models/Payment';
import {
  IdentificationTypeInterface
} from 'src/app/lib/mercadopago/models/IdentificationType';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  loaded = false;
  monto = 100;
  concepto = 'Productos';
  private procesar_pago_uri = 'https://us-central1-shopmax.cloudfunctions.net/procesarpago';

  constructor(private paymentService: PaymentService,
    private usrService: UserService) {
    this.paymentService.token =
      'TEST-3257709747412373-012413-9b459b2bb667535ea246a09be2ed50f9-24703435';
  }

  ngOnInit() { }

  loadScript() {
    return new Promise((resolve, reject) => {
      if (!this.loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js';
        script.setAttribute('data-public-key', this.usrService.userData.mp_config.public_key);
        script.setAttribute('data-button-label', 'Mercado Pago');
        script.setAttribute('data-summary-product', this.concepto);
        script.setAttribute('data-transaction-amount', this.monto.toString());
        script.onload = () => {
          this.loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };

        script.onerror = (error: any) =>
          resolve({ script: name, loaded: false, status: 'Loaded' });
        const form = document.createElement('form');
        form.setAttribute('action', `${this.procesar_pago_uri}/${this.usrService.userId}/orden01`);
        form.setAttribute('method', 'POST');
        form.setAttribute('slot', 'end');
        form.appendChild(script);

        document.getElementsByName('pagoButton')[0].appendChild(form);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }
}
