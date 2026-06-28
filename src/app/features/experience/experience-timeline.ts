import { Component, inject } from '@angular/core';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [NgmMotionDirective],
  template: `
    <section id="experience" class="py-24 relative overflow-hidden bg-primary">
      <div class="max-w-6xl mx-auto px-6">
        
        <!-- Section Header -->
        <div 
          ngmMotion
          [initial]="{ opacity: 0, y: 20 }"
          [whileInView]="{ opacity: 1, y: 0 }"
          [viewport]="{ once: true }"
          [transition]="{ duration: 0.6 }"
          class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight font-display">
            Experience &amp; <span class="text-accent-teal">Education</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-accent-blue to-accent-teal mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Timeline Wrapper -->
        <div class="relative">
          
          <!-- Timeline Vertical Center Line -->
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800/80 -translate-x-1/2 -z-10">
            <!-- Animated Drawing Line -->
            <div 
              ngmMotion
              [initial]="{ height: '0%' }"
              [whileInView]="{ height: '100%' }"
              [viewport]="{ once: true, margin: '-80px' }"
              [transition]="{ duration: 1.8, ease: 'easeInOut' }"
              class="w-full bg-gradient-to-b from-accent-blue via-accent-purple to-accent-teal origin-top">
            </div>
          </div>

          <!-- Chronology List (Combined Experience + Education) -->
          <div class="space-y-16">
            
            <!-- SECTION HEADING: Work Experience -->
            <div class="flex md:justify-center items-center">
              <span class="bg-primary border border-slate-800 text-accent-blue px-6 py-2 rounded-full font-bold font-display uppercase tracking-widest text-sm md:text-base z-10 shadow-lg">
                Work Experience
              </span>
            </div>

            @for (exp of experience(); track exp.role; let i = $index) {
              <div 
                ngmMotion
                [initial]="{ opacity: 0, y: 40 }"
                [whileInView]="{ opacity: 1, y: 0 }"
                [viewport]="{ once: true, margin: '-50px' }"
                [transition]="{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }"
                class="flex flex-col md:flex-row items-stretch md:justify-between relative">
                
                <!-- Dot marker on timeline -->
                <div class="absolute left-4 md:left-1/2 w-4 h-4 bg-[#0a0a0f] border-2 border-accent-blue rounded-full -translate-x-1/2 translate-y-6 md:translate-y-8 z-10 shadow-[0_0_12px_rgba(0,210,255,0.6)]"></div>
                
                <!-- Left spacing (or content card) -->
                <div class="w-full md:w-[45%] pl-10 md:pl-0 md:text-right flex flex-col justify-start md:order-1" [class.md:order-3]="i % 2 === 1">
                  @if (i % 2 === 0) {
                    <!-- Card displays on left for even index -->
                    <div class="glass-card p-6 md:p-8 rounded-3xl text-left border border-slate-800/80">
                      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                          <h4 class="text-xl font-bold font-display text-white">{{ exp.role }}</h4>
                          <span class="text-accent-teal text-sm font-semibold">{{ exp.company }}</span>
                        </div>
                        <span class="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full w-fit">
                          {{ exp.startDate }} – {{ exp.endDate }}
                        </span>
                      </div>
                      <ul class="list-disc pl-4 space-y-2 text-slate-400 text-sm">
                        @for (bullet of exp.description; track bullet) {
                          <li>{{ bullet }}</li>
                        }
                      </ul>
                    </div>
                  } @else {
                    <!-- Blank spacer for odd index in md viewport -->
                  }
                </div>

                <!-- Spacer in center (width of timeline line) -->
                <div class="hidden md:block w-4 order-2"></div>

                <!-- Right content card (or spacing) -->
                <div class="w-full md:w-[45%] pl-10 md:pl-0 flex flex-col justify-start order-3" [class.md:order-1]="i % 2 === 1">
                  @if (i % 2 === 1) {
                    <!-- Card displays on right for odd index -->
                    <div class="glass-card p-6 md:p-8 rounded-3xl text-left border border-slate-800/80">
                      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                          <h4 class="text-xl font-bold font-display text-white">{{ exp.role }}</h4>
                          <span class="text-accent-teal text-sm font-semibold">{{ exp.company }}</span>
                        </div>
                        <span class="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full w-fit">
                          {{ exp.startDate }} – {{ exp.endDate }}
                        </span>
                      </div>
                      <ul class="list-disc pl-4 space-y-2 text-slate-400 text-sm">
                        @for (bullet of exp.description; track bullet) {
                          <li>{{ bullet }}</li>
                        }
                      </ul>
                    </div>
                  } @else {
                    <!-- Blank spacer for even index in md viewport -->
                  }
                </div>

              </div>
            }

            <!-- SECTION HEADING: Education -->
            <div class="flex md:justify-center items-center pt-8">
              <span class="bg-primary border border-slate-800 text-accent-purple px-6 py-2 rounded-full font-bold font-display uppercase tracking-widest text-sm md:text-base z-10 shadow-lg">
                Education
              </span>
            </div>

            @for (edu of education(); track edu.degree; let i = $index) {
              <div 
                ngmMotion
                [initial]="{ opacity: 0, y: 40 }"
                [whileInView]="{ opacity: 1, y: 0 }"
                [viewport]="{ once: true, margin: '-50px' }"
                [transition]="{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }"
                class="flex flex-col md:flex-row items-stretch md:justify-between relative">
                
                <!-- Dot marker on timeline -->
                <div class="absolute left-4 md:left-1/2 w-4 h-4 bg-[#0a0a0f] border-2 border-accent-purple rounded-full -translate-x-1/2 translate-y-6 md:translate-y-8 z-10 shadow-[0_0_12px_rgba(157,77,221,0.6)]"></div>
                
                <!-- Left spacing (or content card) -->
                <div class="w-full md:w-[45%] pl-10 md:pl-0 md:text-right flex flex-col justify-start md:order-1" [class.md:order-3]="i % 2 === 1">
                  @if (i % 2 === 0) {
                    <!-- Card displays on left for even index -->
                    <div class="glass-card p-6 md:p-8 rounded-3xl text-left border border-slate-800/80">
                      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                          <h4 class="text-xl font-bold font-display text-white">{{ edu.degree }}</h4>
                          <span class="text-accent-purple text-sm font-semibold">{{ edu.institution }}</span>
                        </div>
                        <span class="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full w-fit">
                          {{ edu.startDate }} – {{ edu.endDate }}
                        </span>
                      </div>
                      <div class="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                        <span class="text-xs tracking-wider text-slate-500 uppercase">Performance</span>
                        <span class="text-sm font-bold text-accent-teal">{{ edu.score }}</span>
                      </div>
                    </div>
                  } @else {
                    <!-- Blank spacer for odd index in md viewport -->
                  }
                </div>

                <!-- Spacer in center (width of timeline line) -->
                <div class="hidden md:block w-4 order-2"></div>

                <!-- Right content card (or spacing) -->
                <div class="w-full md:w-[45%] pl-10 md:pl-0 flex flex-col justify-start order-3" [class.md:order-1]="i % 2 === 1">
                  @if (i % 2 === 1) {
                    <!-- Card displays on right for odd index -->
                    <div class="glass-card p-6 md:p-8 rounded-3xl text-left border border-slate-800/80">
                      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div>
                          <h4 class="text-xl font-bold font-display text-white">{{ edu.degree }}</h4>
                          <span class="text-accent-purple text-sm font-semibold">{{ edu.institution }}</span>
                        </div>
                        <span class="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full w-fit">
                          {{ edu.startDate }} – {{ edu.endDate }}
                        </span>
                      </div>
                      <div class="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                        <span class="text-xs tracking-wider text-slate-500 uppercase">Performance</span>
                        <span class="text-sm font-bold text-accent-teal">{{ edu.score }}</span>
                      </div>
                    </div>
                  } @else {
                    <!-- Blank spacer for even index in md viewport -->
                  }
                </div>

              </div>
            }

          </div>
          
        </div>

      </div>
    </section>
  `
})
export class ExperienceTimeline {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly experience = this.portfolioService.experience;
  protected readonly education = this.portfolioService.education;
}
