import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface SidePanelAnimationParams {
  duration: number;
}

export interface SidePanelWrapperAnimationState {
  value: 'primary' | 'secondary';
  params: {
    xBefore: string;
    xAfter: string;
  } & SidePanelAnimationParams;
}

export interface SidePanelBackDropAnimationState {
  params: {
    opacityIn: number;
    opacityOut: number;
  } & SidePanelAnimationParams;
}

export const TRANSITION = '{{duration}}ms ease-in-out';
export const DEFAULT_ANIMATION_PARAMS: SidePanelAnimationParams = {
  duration: 300,
};

export const DEFAULT_WRAPPER_ANIMATION_STATE: SidePanelWrapperAnimationState = {
  value: 'primary',
  params: {
    ...DEFAULT_ANIMATION_PARAMS,
    xBefore: '100%',
    xAfter: '0',
  },
};

export const DEFAULT_BACKDROP_ANIMATION_STATE: SidePanelBackDropAnimationState =
  {
    params: {
      ...DEFAULT_ANIMATION_PARAMS,
      opacityIn: 0.4,
      opacityOut: 0,
    },
  };

export const sidePanelAnimations = [
  trigger('wrapperSlideIn', [
    state(
      '*',
      style({ transform: 'translateX({{xAfter}})' }),
      DEFAULT_WRAPPER_ANIMATION_STATE
    ),
    transition(
      'primary <=> secondary',
      [
        query(':self', [
          style({ transform: 'translateX({{xBefore}})' }),
          animate(TRANSITION, style({ transform: 'translateX({{xAfter}})' })),
        ]),
      ],
      DEFAULT_WRAPPER_ANIMATION_STATE
    ),
    transition(
      ':enter',
      [
        group([
          query(':self', [
            style({ transform: 'translateX({{xBefore}})' }),
            animate(TRANSITION, style({ transform: 'translateX({{xAfter}})' })),
          ]),
        ]),
        query(':enter', animateChild(), { optional: true }),
      ],
      DEFAULT_WRAPPER_ANIMATION_STATE
    ),
    transition(
      ':leave',
      [
        query(':leave', animateChild(), { optional: true }),
        group([
          // This is needed not to remove data under router-outlet before wrapper animation being done.
          query(':leave > *', [animate(TRANSITION, style({}))], {
            optional: true,
          }),
          query(':self', [
            style({ transform: 'translateX({{xAfter}})' }),
            animate(TRANSITION, style({ transform: 'translateX(100%)' })),
          ]),
        ]),
      ],
      DEFAULT_WRAPPER_ANIMATION_STATE
    ),
  ]),
  trigger('backDropFadeIn', [
    state(
      '*',
      style({ opacity: '{{opacityIn}}' }),
      DEFAULT_BACKDROP_ANIMATION_STATE
    ),
    transition(
      ':enter',
      [
        style({ opacity: '{{opacityOut}}' }),
        animate(TRANSITION, style({ opacity: '{{opacityIn}}' })),
      ],
      DEFAULT_BACKDROP_ANIMATION_STATE
    ),
    transition(
      ':leave',
      [
        style({ opacity: '{{opacityIn}}' }),
        animate(TRANSITION, style({ opacity: '{{opacityOut}}' })),
      ],
      DEFAULT_BACKDROP_ANIMATION_STATE
    ),
  ]),
];
