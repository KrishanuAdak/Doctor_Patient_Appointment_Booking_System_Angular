import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideHttpClient } from '@angular/common/http';  // ✅ IMPORTANT

import { routes } from './app.routes';
// import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes),
    // provideClientHydration(),
    // provideHttpClient()   // ✅ Proper fix
  ]
};