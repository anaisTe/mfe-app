import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeMfeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-mfe-users-root',
  standalone: true,
  imports: [RouterOutlet, HomeMfeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfe-users';
}
