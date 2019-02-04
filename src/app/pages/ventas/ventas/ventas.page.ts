import {Component, OnInit} from '@angular/core';
import {PaymentService} from 'src/app/lib/mercadopago/services/payment.service';
import {Observable, from} from 'rxjs';
import {PaymentMethodInterface} from 'src/app/lib/mercadopago/models/Payment';
import {
  IdentificationTypeInterface
} from 'src/app/lib/mercadopago/models/IdentificationType';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  paymentMethods: Observable<PaymentMethodInterface>;
  identificationTypes: Observable<IdentificationTypeInterface>;
  loaded = false;

  constructor(private paymentService: PaymentService) {
    this.paymentService.token =
        'TEST-3257709747412373-012413-9b459b2bb667535ea246a09be2ed50f9-24703435';
  }

  ngOnInit() {
    this.paymentMethods = this.paymentService.PaymentMethods;
    this.identificationTypes =
        this.paymentService.IdentificationTypes.pipe(map(data => {
          console.log(data);
          return data;
        }));
    this.loadScript()
        .then(data => console.log('data', data))
        .catch(error => console.log('Error', error));
  }

  loadScript() {
    return new Promise((resolve, reject) => {
      if (!this.loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src =
            'https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js';
        script.setAttribute('data-public-key',
                            'TEST-a1588be8-d3a2-48fb-9254-9db98b33824e');
        script.setAttribute('data-transaction-amount', '1000');
        script.onload = () => {
          this.loaded = true;
          resolve({script: name, loaded: true, status: 'Loaded'});
        };

        script.onerror = (error: any) =>
            resolve({script: name, loaded: false, status: 'Loaded'});
        const form = document.createElement('form');
        form.setAttribute('action', 'http://localhost:5000/shopmax/us-central1/procesarpago/10');
        form.setAttribute('method', 'POST');
        form.setAttribute('slot', 'end');
        form.appendChild(script);

        document.getElementsByName('pagoButton')[0].appendChild(form);
      } else {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      }
    });
  }
}
