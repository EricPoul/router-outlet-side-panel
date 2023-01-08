import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidePanelHeaderComponent } from '@router-outlet-side-panel/routing-side-panel';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { MatListModule } from '@angular/material/list';
import { NgForOf, AsyncPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CartService } from './cart.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Product } from '../products/product-list/products';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';

@Component({
  selector: 'router-outlet-side-panel-cart',
  standalone: true,
  imports: [
    SidePanelHeaderComponent,
    MatButtonModule,
    RouterLink,
    MatListModule,
    NgForOf,
    AsyncPipe,
    NgIf,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly account$ = inject(AccountService).account$;
  readonly cart$ = this.cartService.cart$;
  readonly totalPrice$ = this.cart$.pipe(
    map((cartItems) =>
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
  );
  selectedCard: number | null = null;

  selectCard(card: number): void {
    this.selectedCard = card;
  }

  changeCartItemQuantity(productId: Product['id'], value: number): void {
    this.cartService.changeQuantity(productId, value);
  }

  deleteCartItem(productId: Product['id']): void {
    this.cartService.deleteProduct(productId);
  }

  clear(): void {
    this.cartService.clear();
    this.router.navigate([{ outlets: { cart: null } }]);
  }
}
