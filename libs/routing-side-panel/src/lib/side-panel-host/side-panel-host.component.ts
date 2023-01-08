import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Injector,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  SidePanelHostService,
  CreateComponentParams,
} from './side-panel-host.service';
import { SidePanelComponent } from '../side-panel/side-panel.component';

@Component({
  selector: 'side-panel-host',
  standalone: true,
  templateUrl: './side-panel-host.component.html',
  styleUrls: ['./side-panel-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelHostComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  constructor(private readonly sidePanelService: SidePanelHostService) {
    this.sidePanelService.attach(this);
  }

  addComponentChild({
    component,
    injector,
    index,
  }: CreateComponentParams): ComponentRef<SidePanelComponent> {
    return this.viewContainerRef.createComponent<SidePanelComponent>(
      component,
      {
        index,
        injector: Injector.create({
          parent: injector,
          providers: [
            {
              provide: SidePanelHostComponent,
              useValue: this,
            },
          ],
        }),
      }
    );
  }
}
