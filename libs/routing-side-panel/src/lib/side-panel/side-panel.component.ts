import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { SIDE_PANEL_CONTEXT } from '../routing-side-panel-default-width.token';
import { SidePanelRouterOutletComponent } from '../side-panel-router-outlet/side-panel-router-outlet.component';

import {
  DEFAULT_WRAPPER_ANIMATION_STATE,
  sidePanelAnimations,
  SidePanelWrapperAnimationState,
} from './side-panel-animations';

@UntilDestroy()
@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [...sidePanelAnimations],
})
export class SidePanelComponent implements OnDestroy {
  readonly wrapperAnimationState$: Observable<SidePanelWrapperAnimationState>;

  protected readonly sidePanelContext = inject(SIDE_PANEL_CONTEXT);
  private readonly sidePanelRouterOutlet = inject(
    SidePanelRouterOutletComponent
  );

  private readonly wrapperAnimationStateSubject =
    new BehaviorSubject<SidePanelWrapperAnimationState>({
      ...DEFAULT_WRAPPER_ANIMATION_STATE,
    });

  constructor() {
    this.wrapperAnimationState$ =
      this.wrapperAnimationStateSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.wrapperAnimationStateSubject.complete();
  }

  close(): void {
    this.sidePanelRouterOutlet?.deactivate();
  }

  makePrimary(): void {
    // eslint-disable-next-line rxjs/no-subject-value
    if (this.wrapperAnimationStateSubject.getValue().value === 'primary') {
      return;
    }

    this.updateAnimation('primary', (params) => ({
      xBefore: params.xAfter,
      xAfter: '0',
    }));
  }

  makeSecondary(): void {
    // eslint-disable-next-line rxjs/no-subject-value
    if (this.wrapperAnimationStateSubject.getValue().value === 'secondary') {
      return;
    }

    this.updateAnimation('secondary', () => ({
      xBefore: '0',
      xAfter: `calc(${this.sidePanelContext.width} - 100vw)`,
    }));
  }

  updateAnimation(
    stateName: SidePanelWrapperAnimationState['value'],
    paramsCb: (
      params: SidePanelWrapperAnimationState['params']
    ) => Partial<SidePanelWrapperAnimationState['params']>
  ): void {
    // eslint-disable-next-line rxjs/no-subject-value
    const prevWrapperAnimationState =
      this.wrapperAnimationStateSubject.getValue();

    this.wrapperAnimationStateSubject.next({
      ...prevWrapperAnimationState,
      value: stateName,
      params: {
        ...prevWrapperAnimationState.params,
        ...paramsCb(prevWrapperAnimationState.params),
      },
    });
  }
}
