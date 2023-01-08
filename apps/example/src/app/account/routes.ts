import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { PaymentCardsComponent } from './payment-cards/payment-cards.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'payment-cards',
        component: PaymentCardsComponent,
      }
    ]
  }
]
