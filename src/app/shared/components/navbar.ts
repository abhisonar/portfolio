import { Component, signal, HostListener } from '@angular/core';
import { NgmMotionDirective } from '@scripttype/ng-motion';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgmMotionDirective],
  template: `
    <nav 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
      [class.bg-[#0a0a0f]/80]="isScrolled()"
      [class.backdrop-blur-md]="isScrolled()"
      [class.border-transparent]="!isScrolled()"
      [class.border-slate-900/60]="isScrolled()"
      [class.py-4]="isScrolled()"
      [class.py-6]="!isScrolled()">
      <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        <!-- Logo -->
        <a href="#hero" class="flex items-center gap-2 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-blue p-[1.5px] group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all">
            <div class="w-full h-full rounded-[10px] bg-[#0a0a0f] flex items-center justify-center">
              <span class="font-display font-extrabold text-white text-lg">AS</span>
            </div>
          </div>
          <span class="font-display font-bold text-slate-100 group-hover:text-accent-blue transition-colors tracking-wide hidden sm:block">
            Abhishek Sonar
          </span>
        </a>

        <!-- Desktop Menu Items -->
        <div class="hidden md:flex items-center gap-8">
          @for (item of menuItems; track item.label) {
            <a 
              [href]="item.link" 
              class="relative font-medium text-sm text-slate-400 hover:text-white transition-colors py-1.5 px-1 group">
              {{ item.label }}
              <!-- Animated hover line under navbar items -->
              <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-teal group-hover:w-full transition-all duration-350 rounded-full"></span>
            </a>
          }
          <!-- CTA Contact Link -->
          <a 
            href="#contact" 
            ngmMotion
            [whileHover]="{ scale: 1.05 }"
            [whileTap]="{ scale: 0.95 }"
            class="px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-accent-blue to-accent-purple text-slate-900 font-bold hover:shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all">
            Hire Me
          </a>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button 
          (click)="toggleMenu()"
          class="md:hidden w-10 h-10 rounded-lg flex items-center justify-center bg-primary-light border border-slate-800 text-slate-300 hover:text-white transition-all">
          @if (isMenuOpen()) {
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          } @else {
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          }
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (isMenuOpen()) {
        <div 
          ngmMotion
          [initial]="{ opacity: 0, height: 0 }"
          [animate]="{ opacity: 1, height: 'auto' }"
          [exit]="{ opacity: 0, height: 0 }"
          [transition]="{ duration: 0.3 }"
          class="md:hidden bg-[#0c0c14]/98 border-b border-slate-800/80 backdrop-blur-lg">
          <div class="px-6 py-6 flex flex-col gap-4">
            @for (item of menuItems; track item.label) {
              <a 
                [href]="item.link" 
                (click)="closeMenu()"
                class="text-slate-300 hover:text-accent-blue font-semibold text-lg py-2 border-b border-slate-800/40">
                {{ item.label }}
              </a>
            }
            <a 
              href="#contact" 
              (click)="closeMenu()"
              class="w-full text-center py-3.5 rounded-xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple text-slate-900 mt-4">
              Hire Me
            </a>
          </div>
        </div>
      }
    </nav>
  `
})
export class Navbar {
  protected readonly isScrolled = signal(false);
  protected readonly isMenuOpen = signal(false);

  protected readonly menuItems = [
    { label: 'Home', link: '#hero' },
    { label: 'About', link: '#about' },
    { label: 'Skills', link: '#skills' },
    { label: 'Experience', link: '#experience' },
    { label: 'Projects', link: '#projects' },
    { label: 'Contact', link: '#contact' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
