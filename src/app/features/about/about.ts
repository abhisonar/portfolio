import { Component, inject } from '@angular/core';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgmMotionDirective],
  template: `
    <section id="about" class="py-24 relative overflow-hidden bg-primary">
      <div class="max-w-6xl mx-auto px-6">
        
        <!-- Section Header -->
        <div 
          ngmMotion
          [initial]="{ opacity: 0, y: 20 }"
          [whileInView]="{ opacity: 1, y: 0 }"
          [viewport]="{ once: true }"
          [transition]="{ duration: 0.6 }"
          class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight font-display">
            About <span class="text-accent-purple">Me</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Bio Column -->
          <div 
            ngmMotion
            [initial]="{ opacity: 0, x: -30 }"
            [whileInView]="{ opacity: 1, x: 0 }"
            [viewport]="{ once: true }"
            [transition]="{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }"
            class="lg:col-span-7 space-y-6">
            <h3 class="text-2xl md:text-3xl font-semibold font-display text-slate-100">
              Scaling operations and building high-performance frontend solutions.
            </h3>
            
            <p class="text-slate-400 leading-relaxed text-lg">
              {{ profile().summary }}
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <div class="flex items-center text-slate-400 bg-primary-light border border-slate-800/80 px-4 py-2 rounded-xl text-sm">
                <span class="text-accent-blue font-bold mr-2">Email:</span>
                <a [href]="'mailto:' + profile().email" class="hover:text-accent-blue transition-colors">{{ profile().email }}</a>
              </div>
              <div class="flex items-center text-slate-400 bg-primary-light border border-slate-800/80 px-4 py-2 rounded-xl text-sm">
                <span class="text-accent-teal font-bold mr-2">Location:</span>
                <span>{{ profile().location }}</span>
              </div>
            </div>
          </div>

          <!-- Stats / Highlights Column -->
          <div 
            ngmMotion
            [initial]="{ opacity: 0, x: 30 }"
            [whileInView]="{ opacity: 1, x: 0 }"
            [viewport]="{ once: true }"
            [transition]="{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }"
            class="lg:col-span-5 grid grid-cols-2 gap-4">
            
            <!-- Stat Card 1 -->
            <div class="glass-card p-6 rounded-2xl flex flex-col justify-center h-40">
              <span class="text-4xl md:text-5xl font-extrabold text-accent-blue font-display mb-2">3+</span>
              <span class="text-xs tracking-widest text-slate-500 uppercase">Years of Experience</span>
              <span class="text-sm font-semibold text-slate-300 mt-1">Angular 14 to 22</span>
            </div>

            <!-- Stat Card 2 -->
            <div class="glass-card p-6 rounded-2xl flex flex-col justify-center h-40">
              <span class="text-4xl md:text-5xl font-extrabold text-accent-teal font-display mb-2">40%</span>
              <span class="text-xs tracking-widest text-slate-500 uppercase">Efficiency Increase</span>
              <span class="text-sm font-semibold text-slate-300 mt-1">Application Optimization</span>
            </div>

            <!-- Stat Card 3 -->
            <div class="glass-card p-6 rounded-2xl flex flex-col justify-center h-40 col-span-2">
              <div class="flex items-baseline justify-between mb-2">
                <span class="text-4xl md:text-5xl font-extrabold text-accent-purple font-display">+20%</span>
                <span class="text-sm text-accent-teal font-medium">Nx Monorepos</span>
              </div>
              <span class="text-xs tracking-widest text-slate-500 uppercase">Sprint Velocity Boost</span>
              <span class="text-sm font-semibold text-slate-300 mt-1">Via automated quality gates & AI-assisted workflows</span>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  `
})
export class About {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly profile = this.portfolioService.profile;
}
