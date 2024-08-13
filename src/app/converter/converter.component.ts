import { Component, OnDestroy } from '@angular/core';
import { CurrencyService } from '../data/services/currency.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent implements OnDestroy {
  private subscriptions = new Subscription();

  CurrencyForm = new FormGroup({
    first_currency_amount: new FormControl(''),
    selectedFirstCurrency: new FormControl(''),
    second_currency_amount: new FormControl(''),
    selectedSecondCurrency: new FormControl(''),
  });

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.initializeSubscriptions();
  }

  private initializeSubscriptions() {
    this.subscriptions.add(
      this.CurrencyForm.get('first_currency_amount')?.valueChanges.subscribe(
        () => {
          this.updateSecondAmount();
        }
      )
    );

    this.subscriptions.add(
      this.CurrencyForm.get('selectedFirstCurrency')?.valueChanges.subscribe(
        () => {
          this.updateSecondAmount();
        }
      )
    );

    this.subscriptions.add(
      this.CurrencyForm.get('second_currency_amount')?.valueChanges.subscribe(
        () => {
          this.updateFirstAmount();
        }
      )
    );

    this.subscriptions.add(
      this.CurrencyForm.get('selectedSecondCurrency')?.valueChanges.subscribe(
        () => {
          this.updateFirstAmount();
        }
      )
    );
  }

  updateSecondAmount() {
    const input1Value = Number(
      this.CurrencyForm.get('first_currency_amount')?.value
    );
    const select1Value = this.CurrencyForm.get('selectedFirstCurrency')?.value;
    const select2Value = this.CurrencyForm.get('selectedSecondCurrency')?.value;

    if (select1Value && select2Value) {
      this.currencyService
        .getExchangeTotalAmount(select2Value, select1Value, input1Value)
        .subscribe((v) => {
          this.CurrencyForm.get('second_currency_amount')?.patchValue(
            String(v.conversion_result),
            { emitEvent: false }
          );
        });
    }
  }

  updateFirstAmount() {
    const input2Value = Number(
      this.CurrencyForm.get('second_currency_amount')?.value
    );
    const select1Value = this.CurrencyForm.get('selectedFirstCurrency')?.value;
    const select2Value = this.CurrencyForm.get('selectedSecondCurrency')?.value;

    if (select1Value && select2Value) {
      this.currencyService
        .getExchangeTotalAmount(select1Value, select2Value, input2Value)
        .subscribe((v) => {
          this.CurrencyForm.get('first_currency_amount')?.patchValue(
            String(v.conversion_result),
            { emitEvent: false }
          );
        });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
