import { Routes, ActivatedRouteSnapshot } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent,
    children: [
      {
        path: ':id',
        component: ProductDetailsComponent,
        canActivate: [
          (route: ActivatedRouteSnapshot) => route.params['id'] !== undefined,
        ],
        data: {
          routingSidePanelWidth: 30,
        },
      },
    ],
  },
];
