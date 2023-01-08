import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SidePanelRouterOutletComponent } from '../side-panel-router-outlet/side-panel-router-outlet.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'side-panel-header',
  standalone: true,
  templateUrl: './side-panel-header.component.html',
  styleUrls: ['./side-panel-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
})
export class SidePanelHeaderComponent {
  @Input() title: string = '';

  private readonly sidePanelRouterOutlet = inject(
    SidePanelRouterOutletComponent
  );

  deactivate(): void {
    this.sidePanelRouterOutlet?.deactivate();
  }
}
