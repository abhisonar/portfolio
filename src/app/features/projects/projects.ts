import { Component, inject, signal } from '@angular/core';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgmMotionDirective],
  template: `
    <section id="projects" class="py-24 relative overflow-hidden bg-bg-darker">
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
            Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Projects</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of projects(); track project.title) {
            <!-- Card Wrapper -->
            <div 
              ngmMotion
              [layoutId]="project.title + '-card-layout'"
              [whileHover]="{ y: -8 }"
              [transition]="{ type: 'spring', stiffness: 300, damping: 22 }"
              (click)="openProject(project)"
              class="glass-card rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full border border-slate-800/80 group">
              
              <!-- Project Image Container -->
              <div 
                ngmMotion
                [layoutId]="project.title + '-image-layout'"
                class="h-48 overflow-hidden relative">
                <img 
                  [src]="project.imageUrl" 
                  [alt]="project.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-60"></div>
              </div>

              <!-- Content body -->
              <div class="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 
                    ngmMotion
                    [layoutId]="project.title + '-title-layout'"
                    class="text-xl font-bold font-display text-white mb-2 group-hover:text-accent-blue transition-colors">
                    {{ project.title }}
                  </h3>
                  
                  <p class="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {{ project.description }}
                  </p>
                </div>

                <div>
                  <!-- Tech stack tags -->
                  <div class="flex flex-wrap gap-1.5 mb-2">
                    @for (tech of project.techStack.slice(0, 4); track tech) {
                      <span class="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded bg-primary-light border border-slate-800 text-slate-300">
                        {{ tech }}
                      </span>
                    }
                    @if (project.techStack.length > 4) {
                      <span class="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded bg-primary-light border border-slate-800 text-accent-teal">
                        +{{ project.techStack.length - 4 }}
                      </span>
                    }
                  </div>
                  
                  <span class="text-xs font-bold text-accent-blue group-hover:underline flex items-center gap-1 mt-4">
                    Learn More 
                    <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Detail Overlay / Modal (Shared Element Expansion) -->
        @if (activeProject(); as project) {
          <div 
            class="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
            (click)="closeProject()">
            
            <!-- Modal Content Card -->
            <div 
              ngmMotion
              [layoutId]="project.title + '-card-layout'"
              [transition]="{ type: 'spring', stiffness: 220, damping: 26 }"
              class="w-full max-w-3xl glass-card rounded-3xl overflow-hidden border border-slate-700/60 max-h-[90vh] flex flex-col text-left"
              (click)="$event.stopPropagation()">
              
              <!-- Modal Image Header -->
              <div 
                ngmMotion
                [layoutId]="project.title + '-image-layout'"
                class="h-64 md:h-80 w-full overflow-hidden relative flex-shrink-0">
                <img 
                  [src]="project.imageUrl" 
                  [alt]="project.title" 
                  class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent"></div>
                
                <!-- Close Button -->
                <button 
                  (click)="closeProject()"
                  class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/90 text-white border border-slate-700/40 hover:border-slate-500 transition-all z-20">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal Body -->
              <div class="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
                <div>
                  <h3 
                    ngmMotion
                    [layoutId]="project.title + '-title-layout'"
                    class="text-2xl md:text-3.5xl font-extrabold font-display text-white mb-2">
                    {{ project.title }}
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    @for (tech of project.techStack; track tech) {
                      <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary-light border border-slate-800 text-accent-teal">
                        {{ tech }}
                      </span>
                    }
                  </div>
                </div>

                <div class="space-y-4">
                  <p class="text-slate-300 leading-relaxed text-base">
                    {{ project.longDescription || project.description }}
                  </p>
                </div>

                <!-- Footer buttons / URLs -->
                <div class="flex flex-wrap gap-4 pt-4 border-t border-slate-800/80">
                  @if (project.liveUrl) {
                    <a 
                      [href]="project.liveUrl" 
                      target="_blank" 
                      class="px-6 py-2.5 rounded-xl font-medium tracking-wide bg-gradient-to-r from-accent-blue to-accent-teal text-slate-900 font-bold hover:shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all">
                      Visit Live Demo
                    </a>
                  }
                  @if (project.githubUrl) {
                    <a 
                      [href]="project.githubUrl" 
                      target="_blank" 
                      class="px-6 py-2.5 rounded-xl font-medium tracking-wide bg-primary-light border border-slate-800 text-slate-300 hover:text-white transition-all">
                      View Code on GitHub
                    </a>
                  }
                </div>
              </div>

            </div>
          </div>
        }

      </div>
    </section>
  `
})
export class Projects {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly projects = this.portfolioService.projects;

  // Selected project signal for expanded modal
  protected readonly activeProject = signal<Project | null>(null);

  openProject(project: Project) {
    this.activeProject.set(project);
    // Disable body scroll when modal open
    document.body.style.overflow = 'hidden';
  }

  closeProject() {
    this.activeProject.set(null);
    // Re-enable body scroll
    document.body.style.overflow = '';
  }
}
