import { Component, inject, computed } from '@angular/core';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Skill } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgmMotionDirective],
  template: `
    <section id="skills" class="py-24 relative overflow-hidden bg-bg-darker">
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
            My <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-teal">Skills</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-accent-blue to-accent-teal mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Skills Group List -->
        <div class="space-y-16">
          @for (cat of categories; track cat) {
            @if (groupedSkills()[cat]?.length) {
              <div 
                ngmMotion
                [initial]="{ opacity: 0, y: 30 }"
                [whileInView]="{ opacity: 1, y: 0 }"
                [viewport]="{ once: true, margin: '-50px' }"
                [transition]="{ duration: 0.6 }"
                class="space-y-6">
                
                <!-- Category Heading -->
                <h3 class="text-xl md:text-2xl font-bold font-display text-slate-200 border-l-4 border-accent-blue pl-3">
                  {{ cat }}
                </h3>

                <!-- Grid of Skill Cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  @for (skill of groupedSkills()[cat]; track skill.name) {
                    <div 
                      ngmMotion
                      [whileHover]="{ scale: 1.03, y: -4 }"
                      [whileTap]="{ scale: 0.98 }"
                      [transition]="{ type: 'spring', stiffness: 400, damping: 25 }"
                      class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40 group relative overflow-hidden">
                      
                      <!-- Ambient Glow on card hover -->
                      <div class="absolute -inset-px bg-gradient-to-r from-accent-blue/0 to-accent-purple/0 group-hover:from-accent-blue/10 group-hover:to-accent-purple/10 transition-all duration-300 rounded-2xl -z-10"></div>
                      
                      <!-- Icon Header -->
                      <div class="flex items-center justify-between">
                        @if (skill.iconClass.startsWith('devicon-custom-')) {
                          <div class="text-3xl text-accent-blue">
                            @switch (skill.iconClass) {
                              @case ('devicon-custom-claude') {
                                <!-- Claude sparkles icon -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 21L8.188 15.904L3 15L8.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904ZM19.071 4.929a10 10 0 00-14.142 0M21 12a9 9 0 01-9 9m9-9H3m9 9V3" /></svg>
                              }
                              @case ('devicon-custom-openai') {
                                <!-- Brain / Cog -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                              }
                              @case ('devicon-custom-prompt') {
                                <!-- Chat / terminal prompt -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              }
                              @case ('devicon-custom-nx') {
                                <!-- Monorepo / Layered boxes -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                              }
                              @case ('devicon-custom-primeng') {
                                <!-- Shield / Primeng logo -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.477 3.477 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.477 3.477 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.477 3.477 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.477 3.477 0 013.138-3.138z" /></svg>
                              }
                              @case ('devicon-custom-mfe') {
                                <!-- Grid / Federation -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                              }
                              @case ('devicon-custom-api') {
                                <!-- Connect / API nodes -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              }
                              @case ('devicon-custom-test') {
                                <!-- Lab / Beaker -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                              }
                              @case ('devicon-custom-reviews') {
                                <!-- Code checkmark -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              }
                              @case ('devicon-custom-cicd') {
                                <!-- Pipeline loop -->
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.27 15C20.35 17.65 17.65 19.5 15 19.5c-2.2 0-4.2-1-5.5-2.5m11.5-1v5H21" /></svg>
                              }
                              @default {
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                              }
                            }
                          </div>
                        } @else {
                          <i class="text-4xl text-slate-300 group-hover:text-accent-blue transition-colors duration-300" [class]="skill.iconClass"></i>
                        }
                        
                        <!-- Percentage badge -->
                        <span class="text-xs font-semibold text-slate-500 group-hover:text-accent-teal transition-colors">
                          {{ skill.proficiency }}%
                        </span>
                      </div>

                      <!-- Title and Progress bar -->
                      <div class="mt-4">
                        <span class="text-sm font-semibold tracking-wide text-slate-300 group-hover:text-white transition-colors block">
                          {{ skill.name }}
                        </span>
                        
                        <!-- Progress bar -->
                        <div class="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                          <div 
                            ngmMotion
                            [initial]="{ width: '0%' }"
                            [whileInView]="{ width: skill.proficiency + '%' }"
                            [viewport]="{ once: true }"
                            [transition]="{ duration: 1, ease: 'easeOut', delay: 0.15 }"
                            class="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full">
                          </div>
                        </div>
                      </div>

                    </div>
                  }
                </div>
              </div>
            }
          }
        </div>

      </div>
    </section>
  `
})
export class Skills {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly skills = this.portfolioService.skills;

  protected readonly categories = [
    'Languages & Frameworks',
    'AI-Assisted Development',
    'Libraries & Tools',
    'Core Competencies',
    'Cloud & DevOps'
  ] as const;

  protected readonly groupedSkills = computed(() => {
    const currentSkills = this.skills();
    const groups: Record<string, Skill[]> = {};
    
    for (const skill of currentSkills) {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    }
    return groups;
  });
}
