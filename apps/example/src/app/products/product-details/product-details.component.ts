import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelHeaderComponent } from '@router-outlet-side-panel/routing-side-panel';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTS } from '../product-list/products';

@Component({
  selector: 'router-outlet-side-panel-product-details',
  standalone: true,
  imports: [CommonModule, SidePanelHeaderComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute).snapshot;

  readonly product = PRODUCTS.find(({ id }) => id === parseInt(this.activatedRoute.params['id'], 10));
}
