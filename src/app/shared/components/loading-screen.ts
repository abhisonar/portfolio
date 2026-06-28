import { Component } from '@angular/core';
import { NgmMotionDirective } from '@scripttype/ng-motion';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [NgmMotionDirective],
  template: `
    <div 
      ngmMotion
      [initial]="{ opacity: 1 }"
      [exit]="{ opacity: 0, scale: 1.05, transition: { duration: 0.6 } }"
      class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050508]">
      
      <!-- Logo Animation -->
      <div 
        ngmMotion
        [initial]="{ scale: 0.8, opacity: 0 }"
        [animate]="{ scale: 1, opacity: 1 }"
        [transition]="{ type: 'spring', stiffness: 120, damping: 15 }"
        class="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent-purple to-accent-blue p-[2px]">
        <div class="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0a0a0f]">
          <span class="font-display text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-teal">AS</span>
        </div>
        <!-- Glowing aura backdrop -->
        <div class="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-accent-purple to-accent-blue opacity-50 blur-lg animate-pulse-slow"></div>
      </div>

      <h1 
        ngmMotion
        [initial]="{ y: 15, opacity: 0 }"
        [animate]="{ y: 0, opacity: 1 }"
        [transition]="{ delay: 0.15 }"
        class="font-display text-2xl font-bold tracking-wider text-slate-100 mb-1">
        ABHISHEK SONAR
      </h1>
      
      <p 
        ngmMotion
        [initial]="{ y: 15, opacity: 0 }"
        [animate]="{ y: 0, opacity: 0.6 }"
        [transition]="{ delay: 0.3 }"
        class="font-sans text-xs tracking-widest text-slate-400 uppercase">
        Senior Software Engineer
      </p>

      <!-- Progress track bar -->
      <div class="w-48 h-[2px] bg-slate-800 rounded-full mt-8 overflow-hidden relative">
        <div class="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full absolute left-0 w-1/2 animate-loading-bar"></div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes loading-bar {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(100%); }
      100% { transform: translateX(200%); }
    }
    .animate-loading-bar {
      animation: loading-bar 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
  `]
})
export class LoadingScreen {}
