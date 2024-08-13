import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Currency } from '../interfaces/currency.interface';
import { ConvertedCurrency } from '../interfaces/converted_currency.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  http = inject(HttpClient);

  private baseApiUrl = 'https://v6.exchangerate-api.com/v6/';
  private APIKey = import.meta.env.NG_APP_API_KEY;

  getCurrencyExchange(baseCurrency: string, targetCurrency: string) {
    return this.http.get<Currency>(
      `${this.baseApiUrl}/${this.APIKey}/pair/${targetCurrency}/${baseCurrency}`
    );
  }

  getExchangeTotalAmount(
    baseCurrency: string,
    targetCurrency: string,
    amount: number
  ) {
    return this.http.get<ConvertedCurrency>(
      `${this.baseApiUrl}/${this.APIKey}/pair/${targetCurrency}/${baseCurrency}/${amount}`
    );
  }
}
