import { Component, HostListener, signal } from '@angular/core';
import { useMotionValue, useSpring } from '@scripttype/ng-motion';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  template: `
    <!-- Main outer circle following mouse with spring physics -->
    <div 
      class="custom-cursor hidden md:block" 
      [style.left.px]="springX.get()" 
      [style.top.px]="springY.get()"
      [style.width.px]="isHovered() ? 48 : 24"
      [style.height.px]="isHovered() ? 48 : 24"
      [style.borderColor]="isHovered() ? 'var(--color-accent-purple)' : 'var(--color-accent-blue)'"
      [style.transition]="'width 0.2s, height 0.2s, border-color 0.2s'">
    </div>

    <!-- Center dot following mouse with tighter spring physics -->
    <div 
      class="custom-cursor-dot hidden md:block" 
      [style.left.px]="dotX.get()" 
      [style.top.px]="dotY.get()"
      [style.backgroundColor]="isHovered() ? 'var(--color-accent-purple)' : 'var(--color-accent-teal)'">
    </div>
  `
})
export class CustomCursor {
  // Base motion values for mouse coordinates
  private readonly cursorX = useMotionValue(-100);
  private readonly cursorY = useMotionValue(-100);

  // Outer circle spring physics
  protected readonly springX = useSpring(this.cursorX, { stiffness: 200, damping: 25 });
  protected readonly springY = useSpring(this.cursorY, { stiffness: 200, damping: 25 });

  // Center dot spring physics (faster follow)
  protected readonly dotX = useSpring(this.cursorX, { stiffness: 800, damping: 35 });
  protected readonly dotY = useSpring(this.cursorY, { stiffness: 800, damping: 35 });

  // Hover state detection
  protected readonly isHovered = signal(false);

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorX.set(event.clientX);
    this.cursorY.set(event.clientY);
  }

  @HostListener('window:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target) return;
    
    // Check if target is link, button, or explicitly marked
    const isInteractive = target.closest('a, button, [role="button"], input, textarea, .project-card') !== null;
    this.isHovered.set(isInteractive);
  }
}
