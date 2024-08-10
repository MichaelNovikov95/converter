import { Component, Input, inject } from '@angular/core';
import { CurrencyService } from '../data/services/currency.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  currencyService = inject(CurrencyService);
  first_currency_amount = '';
  second_currency_amount = '';
  selectedFirstCurrency = '';
  selectedSecondCurrency = '';

  onSelected(currency: string, value: string): void {
    const parsedFirstAmount = Number(this.first_currency_amount);
    const parsedSecondAmount = Number(this.second_currency_amount);
    if (currency === 'firstCurrency') {
      this.selectedFirstCurrency = value;
      if (parsedFirstAmount !== 0 && this.selectedSecondCurrency !== '') {
        this.currencyService
          .getExchangeTotalAmount(
            this.selectedSecondCurrency,
            this.selectedFirstCurrency,
            parsedFirstAmount
          )
          .subscribe((v) => {
            this.second_currency_amount = String(v.conversion_result);
          });
      }
    } else if (currency === 'secondCurrency') {
      this.selectedSecondCurrency = value;
      if (parsedSecondAmount !== 0 && this.selectedFirstCurrency !== '') {
        this.currencyService
          .getExchangeTotalAmount(
            this.selectedFirstCurrency,
            this.selectedSecondCurrency,
            parsedSecondAmount
          )
          .subscribe((v) => {
            this.first_currency_amount = String(v.conversion_result);
          });
      }
    } else {
      return;
    }
  }

  fetchCurrency(currency: string, value: string): void {
    const parsedValue = Number(value);

    if (!this.selectedFirstCurrency || !this.selectedSecondCurrency) return;

    if (currency === 'firstCurrencyAmount') {
      this.currencyService
        .getExchangeTotalAmount(
          this.selectedSecondCurrency,
          this.selectedFirstCurrency,
          parsedValue
        )
        .subscribe((v) => {
          this.second_currency_amount = String(v.conversion_result);
        });
    } else if (currency === 'secondCurrencyAmount') {
      this.currencyService
        .getExchangeTotalAmount(
          this.selectedFirstCurrency,
          this.selectedSecondCurrency,
          parsedValue
        )
        .subscribe((v) => {
          this.first_currency_amount = String(v.conversion_result);
        });
    }
  }
}
