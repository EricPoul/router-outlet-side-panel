import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PRODUCTS, Product } from './products';
import { NgForOf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../../cart/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidePanelRouterOutletComponent } from '@router-outlet-side-panel/routing-side-panel';

@Component({
  selector: 'router-outlet-side-panel-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    SidePanelRouterOutletComponent,
    RouterOutlet,
  ],
})
export class ProductListComponent {
  readonly products = PRODUCTS;

  private readonly cartService = inject(CartService);

  addProductToCart(product: Product, quantity: number): void {
    this.cartService.addProduct(product, quantity);
  }
}
