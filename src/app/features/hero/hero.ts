import { Component, OnInit, signal, inject } from '@angular/core';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgmMotionDirective],
  template: `
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-radial-gradient">
      <!-- Background grid overlay -->
      <div class="absolute inset-0 bg-grid-pattern opacity-40 z-0"></div>
      
      <!-- Ambient light halos -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] z-0 animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px] z-0 animate-pulse-slow"></div>
      
      <!-- Hero Content Container -->
      <div 
        ngmMotion
        [variants]="parentVariants"
        initial="hidden"
        animate="visible"
        class="max-w-5xl mx-auto px-6 text-center z-10 select-none">
        
        <!-- Welcome badge -->
        <span 
          ngmMotion
          [variants]="childVariants"
          class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary-light border border-slate-800 text-accent-blue mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-accent-teal mr-2 animate-ping"></span>
          Open to New Opportunities
        </span>

        <!-- Main Heading -->
        <h1 
          ngmMotion
          [variants]="childVariants"
          class="text-5xl md:text-8xl font-extrabold tracking-tight mb-4 font-display">
          Hi, I'm 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-teal">
            {{ profile().name }}
          </span>
        </h1>

        <!-- Subtitle with Typing Effect -->
        <h2 
          ngmMotion
          [variants]="childVariants"
          class="text-2xl md:text-4xl font-semibold text-slate-300 mb-6 font-display h-12 flex justify-center items-center">
          <span>I'm a </span>
          <span class="text-accent-teal ml-2 typing-cursor pr-1">{{ currentRole() }}</span>
        </h2>

        <!-- Tagline / Summary -->
        <p 
          ngmMotion
          [variants]="childVariants"
          class="max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed mb-10">
          Senior Software Engineer specializing in Angular and scalable micro-frontend architectures. I design premium, high-performance interfaces and build secure, cloud-native applications.
        </p>

        <!-- CTA Buttons -->
        <div 
          ngmMotion
          [variants]="childVariants"
          class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#contact" 
            ngmMotion 
            [whileHover]="{ scale: 1.05 }"
            [whileTap]="{ scale: 0.95 }"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium tracking-wide bg-gradient-to-r from-accent-blue to-accent-purple text-slate-900 font-bold hover:shadow-[0_0_25px_rgba(0,210,255,0.45)] transition-all duration-300">
            Get In Touch
          </a>
          <a 
            href="#projects" 
            ngmMotion 
            [whileHover]="{ scale: 1.05, border: '1px solid rgba(0, 210, 255, 0.4)' }"
            [whileTap]="{ scale: 0.95 }"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium tracking-wide bg-primary-light border border-slate-800 text-slate-200 hover:text-white transition-all duration-300">
            View My Work
          </a>
        </div>
      </div>

      <!-- Animated scroll indicator -->
      <div 
        ngmMotion
        [initial]="{ opacity: 0, y: -10 }"
        [animate]="{ opacity: 1, y: 0 }"
        [transition]="{ repeat: 99999, duration: 1.5, repeatType: 'reverse', delay: 1 }"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10">
        <span class="text-xs text-slate-500 tracking-widest uppercase">Scroll Down</span>
        <div class="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center p-1">
          <div class="w-1.5 h-1.5 bg-accent-teal rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  `
})
export class Hero implements OnInit {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly profile = this.portfolioService.profile;
  protected readonly currentRole = signal('');

  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private readonly roles = [
    'Senior Software Engineer',
    'Frontend Architect',
    'Micro-Frontend Expert',
    'Agile Leader & Mentor'
  ];

  // Motion Variants
  protected readonly parentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.25,
        delayChildren: 0.1
      }
    }
  };

  protected readonly childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 18 }
    }
  };

  ngOnInit() {
    this.typeEffect();
  }

  private typeEffect() {
    const currentFullRole = this.roles[this.roleIndex];
    
    if (this.isDeleting) {
      this.currentRole.set(currentFullRole.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.currentRole.set(currentFullRole.substring(0, this.charIndex + 1));
      this.charIndex++;
    }
    
    let typingSpeed = this.isDeleting ? 40 : 80;
    
    if (!this.isDeleting && this.charIndex === currentFullRole.length) {
      typingSpeed = 2000; // Pause at end of word
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      typingSpeed = 300; // Pause before typing next word
    }
    
    setTimeout(() => this.typeEffect(), typingSpeed);
  }
}
