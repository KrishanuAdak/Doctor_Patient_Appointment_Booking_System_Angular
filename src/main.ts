import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ add this

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations() // ✅ enable animations like @fadeSlide
  ]
}).catch((err) => console.error(err));
