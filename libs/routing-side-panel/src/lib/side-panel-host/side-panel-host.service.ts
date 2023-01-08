import { Injectable, ComponentRef, Type, Injector } from '@angular/core';
import { SidePanelHostComponent } from './side-panel-host.component';
import { SidePanelComponent } from '../side-panel/side-panel.component';

const NO_HOST = 'Side panels cannot be used without SidePanelHostComponent';

export interface CreateComponentParams {
  component: Type<SidePanelComponent>;
  injector: Injector;
  index: number;
}

/**
 * @private
 */
@Injectable({
  providedIn: 'root',
})
export class SidePanelHostService {
  private host?: SidePanelHostComponent;

  private get safeHost(): SidePanelHostComponent {
    if (!this.host) {
      throw new Error(NO_HOST);
    }

    return this.host;
  }

  attach(host: SidePanelHostComponent): void {
    this.host = host;
  }

  add(params: CreateComponentParams): ComponentRef<SidePanelComponent> {
    return this.safeHost.addComponentChild(params);
  }

  remove<C>({ hostView }: ComponentRef<C>): void {
    hostView.destroy();
  }
}
