import { Injectable, Injector, ComponentRef, inject } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, switchMap, fromEvent, map, EMPTY, filter } from 'rxjs';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { DOCUMENT } from '@angular/common';
import { SidePanelRouterOutletComponent } from './side-panel-router-outlet/side-panel-router-outlet.component';
import { SidePanelHostService } from './side-panel-host/side-panel-host.service';
import { findLastIndex } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class RoutingSidePanelService {
  private sortedRouterOutletsArray: SidePanelRouterOutletComponent[] = [];

  private readonly sidePanelMap = new WeakMap<
    SidePanelRouterOutletComponent,
    ComponentRef<SidePanelComponent>
  >();
  private readonly sidePanelMapSizeSubject = new BehaviorSubject<number>(0);
  private readonly sidePanelHostService = inject(SidePanelHostService);

  constructor() {
    this.deactivateLastOnPressingEscape(inject(DOCUMENT));
  }

  open(outlet: SidePanelRouterOutletComponent, injector: Injector): void {
    if (this.sidePanelMap.get(outlet)) {
      return;
    }

    const position = this.getOutletPosition(outlet);
    const sidePanelRef = this.createSidePanelComponentRef(injector, position);

    this.sortedRouterOutletsArray.splice(position, 0, outlet);
    this.sidePanelMap.set(outlet, sidePanelRef);
    this.sidePanelMapSizeSubject.next(this.sortedRouterOutletsArray.length);
    this.updateSidePanels();
  }

  close(outlet: SidePanelRouterOutletComponent): void {
    const sidePanelRef = this.sidePanelMap.get(outlet);

    if (!sidePanelRef) {
      return;
    }

    this.sortedRouterOutletsArray = this.sortedRouterOutletsArray.filter(
      (outlet2) => outlet2 !== outlet
    );
    this.sidePanelHostService.remove(sidePanelRef);
    this.sidePanelMap.delete(outlet);
    this.sidePanelMapSizeSubject.next(this.sortedRouterOutletsArray.length);
    this.updateSidePanels();
  }

  private updateSidePanels(): void {
    if (!this.sortedRouterOutletsArray.length) {
      return;
    }

    const preLast =
      this.sortedRouterOutletsArray[this.sortedRouterOutletsArray.length - 2];

    if (preLast) {
      // It's optimized and won't make any computations if sidePanel is already primary.
      this.sidePanelMap.get(preLast)?.instance.makeSecondary();
    }

    const last =
      this.sortedRouterOutletsArray[this.sortedRouterOutletsArray.length - 1];

    // It's optimized and won't make any computations if sidePanel is already primary.
    this.sidePanelMap.get(last)?.instance.makePrimary();
  }

  private createSidePanelComponentRef(
    injector: Injector,
    index: number
  ): ComponentRef<SidePanelComponent> {
    const sidePanelRef = this.sidePanelHostService.add({
      component: SidePanelComponent,
      injector: injector,
      index,
    });

    sidePanelRef.changeDetectorRef.markForCheck();

    return sidePanelRef;
  }

  private deactivateLastOnPressingEscape(document: Document): void {
    this.sidePanelMapSizeSubject
      .asObservable()
      .pipe(
        map((size) => !!size),
        distinctUntilChanged(),
        switchMap((atLeastOneSidePanelShown) =>
          atLeastOneSidePanelShown
            ? fromEvent<KeyboardEvent>(document, 'keydown')
            : EMPTY
        ),
        filter(({ key }) => key === 'Escape')
      )
      // subscription will die together with Application
      .subscribe(() => {
        this.sortedRouterOutletsArray.pop()?.deactivate();
      });
  }

  private getOutletPosition(outlet: SidePanelRouterOutletComponent): number {
    let position = this.sortedRouterOutletsArray.length;
    const parentHasChildren = this.sortedRouterOutletsArray.some(
      (sortedOutlet) => sortedOutlet.parent === outlet.parent
    );

    if (parentHasChildren) {
      const lastWithSameLevelPosition = findLastIndex(
        this.sortedRouterOutletsArray,
        (sortedOutlet) =>
          sortedOutlet.parent === outlet.parent &&
          sortedOutlet.level === outlet.level
      );
      const lastWithLowerLevelPosition = findLastIndex(
        this.sortedRouterOutletsArray,
        (sortedOutlet) =>
          sortedOutlet.parent === outlet.parent &&
          sortedOutlet.level < outlet.level
      );

      if (lastWithSameLevelPosition >= 0) {
        position = lastWithSameLevelPosition + 1;
      } else if (lastWithLowerLevelPosition >= 0) {
        position = lastWithLowerLevelPosition + 1;
      } else {
        const parentPosition = outlet.parent ? this.sortedRouterOutletsArray.indexOf(outlet.parent) : -1;

        position = parentPosition + 1;
      }
    }

    return position;
  }
}
