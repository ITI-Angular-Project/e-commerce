import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  host :{
    class : 'bg-light font-display text-dark antialiased  overflow-x-hidden',
  }
})
export class App {
  protected readonly title = signal('e-commerce');
}
