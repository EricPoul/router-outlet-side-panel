import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

const ROUTES: Routes = [
  {
    path: 'product-list',
    loadChildren: async () => (await import('./app/products/routes')).ROUTES,
  },
  {
    path: 'view',
    outlet: 'cart',
    loadChildren: async () => (await import('./app/cart/routes')).ROUTES,
    data: {
      routingSidePanelWidth: 70
    }
  },
  {
    path: 'view',
    outlet: 'account',
    loadChildren: async () => (await import('./app/account/routes')).ROUTES,
    data: {
      routingSidePanelWidth: 70,
      routingSidePanelLevel: 1
    }
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(ROUTES), provideAnimations()],
}).catch((err) => console.error(err));
