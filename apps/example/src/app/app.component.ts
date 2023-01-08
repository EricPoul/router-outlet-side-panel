import { Component, inject } from '@angular/core';
import { SidePanelHostComponent, SidePanelRouterOutletComponent } from '@router-outlet-side-panel/routing-side-panel';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { CartService } from './cart/cart.service';
import { MatBadgeModule } from '@angular/material/badge';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'router-outlet-side-panel-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    SidePanelHostComponent,
    SidePanelRouterOutletComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    MatBadgeModule,
    AsyncPipe,
    NgIf
  ]
})
export class AppComponent {
  readonly cart$ = inject(CartService).cart$;
}
