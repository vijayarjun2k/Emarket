import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TourComponent } from './tour.component';

export interface TourStep {
  selector: string;
  title: string;
  description: string;
  route?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TourService {
 private steps: TourStep[] = [];
  private currentIndex = 0;
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) {}

  init(steps: TourStep[]): void {
    this.steps = steps;
    this.currentIndex = 0;
  }

  start(): void {
    localStorage.setItem('tourDone', 'true');
    this.showStep();
  }

  next(): void {
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
      this.showStep();
    } else {
      this.end();
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.showStep();
    }
  }

  end(): void {
    this.overlayRef?.dispose();
    this.removeHighlight();
  }

  private showStep(): void {
    this.overlayRef?.dispose();
    this.removeHighlight();

    const step = this.steps[this.currentIndex];
    const element = document.querySelector(step.selector) as HTMLElement;

    if (!element) return;

    element.classList.add('tour-highlight');

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 10
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'tour-backdrop'
    });

    const portal = new ComponentPortal(TourComponent);
    const componentRef = this.overlayRef.attach(portal);

    componentRef.instance.title = step.title;
    componentRef.instance.description = step.description;
    componentRef.instance.isFirst = this.currentIndex === 0;
    componentRef.instance.isLast = this.currentIndex === this.steps.length - 1;

    componentRef.instance.next.subscribe(() => this.next());
    componentRef.instance.prev.subscribe(() => this.prev());
    componentRef.instance.skip.subscribe(() => this.end());
  }

  private removeHighlight(): void {
    document
      .querySelectorAll('.tour-highlight')
      .forEach(el => el.classList.remove('tour-highlight'));
  }
}
