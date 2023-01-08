import {
  Component,
  Injector,
  inject,
  ContentChild,
  OnInit,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { merge, tap, Observable } from 'rxjs';
import { RoutingSidePanelService } from '../routing-side-panel.service';
import {
  Router,
  ActivatedRoute,
  RouterOutlet,
  PRIMARY_OUTLET,
  NavigationExtras,
} from '@angular/router';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import {
  injectSidePanelWidth,
  SIDE_PANEL_CONTEXT,
} from '../routing-side-panel-default-width.token';

@UntilDestroy()
@Component({
  selector: 'side-panel-router-outlet',
  standalone: true,
  templateUrl: './side-panel-router-outlet.component.html',
  styleUrls: ['./side-panel-router-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelRouterOutletComponent implements OnInit {
  @ContentChild(RouterOutlet, { static: true })
  private readonly routerOutlet!: RouterOutlet;
  @ViewChild('templateRef', { static: true })
  private readonly template!: TemplateRef<unknown>;

  readonly parent = inject(SidePanelRouterOutletComponent, {
    optional: true,
    skipSelf: true,
  });

  private readonly injector = inject(Injector);
  private readonly routerSidePanelService = inject(RoutingSidePanelService);
  private readonly sidePanelDefaultWidth = injectSidePanelWidth();
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.listenToRouterOutletEvents().pipe(untilDestroyed(this)).subscribe();
  }

  get level(): number {
    return this.routerOutlet.activatedRouteData['routingSidePanelLevel'] ?? 0;
  }

  deactivate(): void {
    const isPrimary = this.routerOutlet.name === PRIMARY_OUTLET;
    const commands = [
      isPrimary ? './' : { outlets: { [this.routerOutlet.name]: null } },
    ];
    const extras: NavigationExtras = {
      relativeTo:
        isPrimary || this.parent
          ? this.activatedRoute
          : this.activatedRoute.parent,
      queryParamsHandling: 'preserve',
    };

    this.router.navigate(commands, extras);
  }

  private open(): void {
    this.routerSidePanelService.open(
      this,
      Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: SIDE_PANEL_CONTEXT,
            useValue: {
              width: `${this.getPanelWidth()}vw`,
              content: this.template,
            },
          },
        ],
      })
    );
  }

  private close(): void {
    this.routerSidePanelService.close(this);
  }

  private listenToRouterOutletEvents(): Observable<void> {
    const activate$ = this.routerOutlet.activateEvents.pipe(
      tap(() => {
        console.log('activate', this.routerOutlet.name);
        this.open();
      })
    );

    const deactivate$ = this.routerOutlet.deactivateEvents.pipe(
      tap(() => {
        this.close();
      })
    );

    return merge(activate$, deactivate$);
  }

  private getPanelWidth(): number {
    const coercedWidth = coerceNumberProperty(
      this.routerOutlet.activatedRouteData['routingSidePanelWidth']
    );

    if (coercedWidth > 0 && coercedWidth <= 100) {
      return coercedWidth;
    } else {
      const correctedWidth = this.sidePanelDefaultWidth;

      console.warn(
        `Side panel width should be in range from 0 to 100. Passed value is ${coercedWidth} and it was corrected to ${correctedWidth}.`
      );

      return correctedWidth;
    }
  }
}
