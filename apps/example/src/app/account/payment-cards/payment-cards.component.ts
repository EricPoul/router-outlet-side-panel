import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidePanelHeaderComponent } from '@router-outlet-side-panel/routing-side-panel';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { AccountService } from '../account.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'router-outlet-side-panel-payment-cards',
  standalone: true,
  imports: [SidePanelHeaderComponent, MatButtonModule, MatListModule, NgForOf, NgIf, AsyncPipe, MatIconModule],
  templateUrl: './payment-cards.component.html',
  styleUrls: ['./payment-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCardsComponent {
  private readonly accountService = inject(AccountService);

  readonly account$ = this.accountService.account$;

  addCard(): void {
    const card = Math.random().toFixed(16).split('.')[1];

    this.accountService.addCard(parseInt(card, 10));
  }

  deleteCard(index: number): void {
    this.accountService.deleteCard(index);
  }
}
