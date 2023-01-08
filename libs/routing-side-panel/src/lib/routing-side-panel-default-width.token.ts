import { inject, InjectionToken, TemplateRef } from '@angular/core';

const SIDE_PANEL_DEFAULT_WIDTH = 50;

export const ROUTING_SIDE_PANEL_DEFAULT_WIDTH =
  new InjectionToken<number>('Default side panel width', {
    providedIn: 'root',
    factory: () => SIDE_PANEL_DEFAULT_WIDTH,
  });

export interface SidePanelContext {
  width: string;
  content: TemplateRef<unknown> | null;
}

export const SIDE_PANEL_CONTEXT = new InjectionToken<SidePanelContext>(
  'Side panel context'
);

export function injectSidePanelWidth(): number {
  return inject(ROUTING_SIDE_PANEL_DEFAULT_WIDTH);
}
