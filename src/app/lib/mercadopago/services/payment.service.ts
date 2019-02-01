import { IDENTIFICATION_TYPES_URI } from './../config';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaymentMethodInterface} from '../models/Payment';
import {PAYMET_METHODS_URI} from '../config';
import {take} from 'rxjs/operators';
import { IdentificationTypeInterface } from '../models/IdentificationType';


@Injectable({providedIn: 'root'})
export class PaymentService {
  // tslint:disable-next-line:no-inferrable-types
  private access_token: string;
  private paymentMethods: Observable<PaymentMethodInterface>;
  constructor(private http: HttpClient) {}

  set token(access_token: string) { this.access_token = access_token; }

  get PaymentMethods(): Observable<PaymentMethodInterface> {
    if (!this.paymentMethods) {
      this.paymentMethods =
          this.http
              .get<PaymentMethodInterface>(
                  `${PAYMET_METHODS_URI}?access_token=${this.access_token}`)
              .pipe(take(1));
    }
    return this.paymentMethods;
  }

  get IdentificationTypes(): Observable<IdentificationTypeInterface> {
    return this.http.get<IdentificationTypeInterface>(`${IDENTIFICATION_TYPES_URI}?access_token=${this.access_token}`).pipe(take(1));
  }

}
