import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Account = {
  name: string;
  cards: number[];
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly accountSubject = new BehaviorSubject<Account>({
    name: 'John Doe',
    cards: [],
  });

  readonly account$ = this.accountSubject.asObservable();

  addCard(card: number): void {
    this.accountSubject.next({
      ...this.accountSubject.getValue(),
      cards: [...this.accountSubject.getValue().cards, card],
    });
  }

  deleteCard(index: number): void {
    this.accountSubject.next({
      ...this.accountSubject.getValue(),
      cards: this.accountSubject.getValue().cards.filter((_, i) => index !== i),
    });
  }
}
