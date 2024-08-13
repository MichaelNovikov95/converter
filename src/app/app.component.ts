import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './data/services/currency.service';
import { ConverterComponent } from './converter/converter.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  private subscriptions = new Subscription();

  USD: string | null = '';
  EUR: string | null = '';
  TIME: string | null = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.fetchCurrencyData();
  }

  private fetchCurrencyData() {
    this.subscriptions.add(
      this.currencyService.getCurrencyExchange('UAH', 'USD').subscribe((v) => {
        this.USD = v.conversion_rate.toFixed(2);
        this.TIME = v.time_last_update_utc.split(' ').splice(0, 4).join(' ');
      })
    );

    this.subscriptions.add(
      this.currencyService.getCurrencyExchange('UAH', 'EUR').subscribe((v) => {
        this.EUR = v.conversion_rate.toFixed();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
