import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SessionTimeoutService {

  private readonly SESSION_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly WARNING_TIME = 60; // show popup at last 60 sec

  remainingTime = signal<number>(0);
  showPopup = signal<boolean>(false);

  private intervalId: any;

  constructor(private router: Router) {}

  startSession() {
    const expiryTime = Date.now() + this.SESSION_DURATION;
    localStorage.setItem('sessionExpiry', expiryTime.toString());
    this.startTimer();
  }

  private startTimer() {
    this.clearTimer();

    this.intervalId = setInterval(() => {
      const expiry = Number(localStorage.getItem('sessionExpiry'));
      const diff = Math.floor((expiry - Date.now()) / 1000);

      this.remainingTime.set(diff);

      if (diff <= this.WARNING_TIME && diff > 0) {
        this.showPopup.set(true);
      }

      if (diff <= 0) {
        this.logout();
      }
    }, 1000);
  }

  extendSession() {
    this.showPopup.set(false);
    this.startSession();
  }

  logout() {
    this.clearTimer();
    localStorage.clear();
    this.showPopup.set(false);
    this.router.navigate(['/login']);
  }

  private clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
