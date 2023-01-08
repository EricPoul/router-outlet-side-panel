import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SidePanelHeaderComponent,
  SidePanelRouterOutletComponent,
} from '@router-outlet-side-panel/routing-side-panel';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AccountService } from './account.service';

@Component({
  selector: 'router-outlet-side-panel-account',
  standalone: true,
  imports: [
    CommonModule,
    SidePanelHeaderComponent,
    MatButtonModule,
    RouterLink,
    SidePanelRouterOutletComponent,
    RouterOutlet,
    MatCardModule
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  readonly account$ = inject(AccountService).account$;
}
