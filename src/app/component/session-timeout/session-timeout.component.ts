import { Component, inject } from '@angular/core';
import { SessionTimeoutService } from '../../service/session-timeout.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-session-timeout',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './session-timeout.component.html',
  styleUrl: './session-timeout.component.css'
})
export class SessionTimeoutComponent {

  service = inject(SessionTimeoutService);

  get minutes() {
    return Math.floor(this.service.remainingTime() / 60);
  }

  get seconds() {
    return this.service.remainingTime() % 60;
  }

}
